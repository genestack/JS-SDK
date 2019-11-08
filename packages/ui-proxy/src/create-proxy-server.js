/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */
const path = require('path');
const http = require('http');
const https = require('https');
const url = require('url');
const _ = require('lodash');
const unzip = require('unzip-response');
const {COLOR_RED} = require('./constants');

const PROXY_HOST = 'localhost';
const WAIT_FOR_REPEAT_MAX = 10000;
const WAIT_FOR_REPEAT_STEP = 500;
const WAIT_FOR_REPEAT_MIN = 0;
let replacedUrls = {};

function createProxyServer({
    proxyPort,
    staticPort,
    replaceServerUrl,
    liveSyncPort,
    noReload
}) {
    const reloadScript = createReloadScript(liveSyncPort);
    const proxyAddress = getProxyAddress(proxyPort);
    let workingBundles = [];
    // the main idea is to:
    //  a) proxy all requests to replaceServerUrl
    //  b) replace all replaceServerUrl's in original html file with proxy urls and inject there a
    //      reloading script
    //  c) if the request is to one of workingBundles, then proxy it to static server
    http.createServer((clientRequest, clientResponse) => {
        const requestServerParams = url.parse(replaceServerUrl);
        const outgoingUrlParams = getOutgoingUrlParams(
            requestServerParams,
            clientRequest,
            proxyPort
        );
        const outgoingRequest = getOutgoingRequestParams(outgoingUrlParams, clientRequest);

        if (workingBundles.some((bundle) => clientRequest.url.indexOf(bundle) >= 0)) {
            Object.assign(
                outgoingRequest,
                getStaticRedirectParameters(staticPort, clientRequest.url)
            );
        }

        const requester = outgoingRequest.protocol === 'https:' ? https : http;
        const replaceHost = getHostReplacer(requestServerParams, proxyPort);

        function createProxy(interval = WAIT_FOR_REPEAT_MIN) {
            const proxy = requester
                .request(outgoingRequest, (originalResponse) => {
                    const isHtml = /text\/html/.test(originalResponse.headers['content-type']);
                    clientResponse.writeHead(
                        originalResponse.statusCode,
                        originalResponse.statusMessage,
                        getResponseHeaders(originalResponse.headers, replaceHost, isHtml)
                    );
                    if (isHtml) {
                        preprocessResponse(
                            replaceURLsInHTML(requestServerParams.host, getProxyAddress(proxyPort)),
                            noReload ? _.identity : injectReloadScript(reloadScript)
                        )(
                            originalResponse,
                            clientResponse
                        );
                    } else {
                        originalResponse.pipe(clientResponse, {end: true});
                    }
                })
                .on('socket', () => {
                    clientRequest.pipe(proxy, {end: true});
                })
                .on('error', (err) => {
                    console.error(err);
                    setTimeout(() => {
                        const newInterval = (
                            (interval >= WAIT_FOR_REPEAT_MAX)
                                ? WAIT_FOR_REPEAT_MAX
                                : interval + WAIT_FOR_REPEAT_STEP
                        );
                        createProxy(newInterval);
                    }, interval);
                });
        }
        createProxy();
    }).listen(proxyPort, () => {
        console.log( // eslint-disable-line no-console
            `Proxying ${replaceServerUrl} to ${proxyAddress}`
        );
        console.log( // eslint-disable-line no-console
            `Check ${proxyAddress}/endpoint/application/run/genestack/signin`
        );
    }).on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(COLOR_RED, `Port ${proxyPort} is in use, retry with another port using --port=<port>`);
            process.exit(1);
        }
    });

    return function updateBundles(newBundles) {
        workingBundles = newBundles.map(
            (bundle) => bundle.replace(path.sep, path.posix.sep)
        );
    };
}

function getOutgoingRequestParams(urlParams, clientReq) {
    const defaultPort = urlParams.protocol === 'https:' ? 443 : 80;
    let path = clientReq.url;
    return {
        method: clientReq.method,
        protocol: urlParams.protocol,
        hostname: urlParams.hostname,
        port: urlParams.port || defaultPort,
        path,
        headers: Object.assign({}, clientReq.headers, {
            host: urlParams.host,
            origin: urlParams.host
        })
    };
}

function getOutgoingUrlParams(requestServerParams, clientReq, proxyPort) {
    const requestedUrl = `${getProxyAddress(proxyPort)}${clientReq.url}`;
    const originalUrl = replacedUrls[requestedUrl];
    if (originalUrl) {
        return url.parse(originalUrl);
    }
    return requestServerParams;
}

function getStaticRedirectParameters(staticPort, requestedUrl) {
    return {
        hostname: PROXY_HOST,
        protocol: 'http:',
        port: staticPort,
        path: requestedUrl.replace(/^.+fingerprint_[0-9A-Za-z-]+/, ''),
        host: PROXY_HOST,
        origin: PROXY_HOST
    };
}

function getResponseHeaders(originalHeaders, replaceHost, isUnzipped) {
    return _.reduce(originalHeaders, (newHeaders, value, headerName) => {
        if (isUnzipped && headerName === 'content-encoding') {
            return newHeaders;
        }
        if (Array.isArray(value)) {
            return Object.assign(newHeaders, {
                [headerName]: _.map(value, replaceHost)
            });
        }
        return Object.assign(newHeaders, {[headerName]: replaceHost(value)});
    }, {});
}

/**
 * @param {Function(string) -> string} preprocessors functions to make replacements in response text
 * @return {Function(http.IncomingMessage, http.ServerResponse)}
 */
function preprocessResponse(...preprocessors) {
    return function(originalResponse, clientResponse) {
        const unzippedResponse = unzip(originalResponse);
        let responseText = '';
        unzippedResponse.on('data', (d) => {
            responseText += d.toString('utf-8');
        });
        unzippedResponse.on('end', () => {
            clientResponse.end(
                preprocessors.reduce(
                    (responseMemo, preprocessor) => preprocessor(responseMemo),
                    responseText
                )
            );
        });
    };
}

function replaceURLsInHTML(replacementHost, proxyAddress) {
    const urlSearch = new RegExp(`['"]{1}((http(s?):\/\/.*${replacementHost}).+)['"]+`, 'gim');
    replacedUrls = {};

    return function(responseText) {
        return responseText.replace(urlSearch, (match, oldUrl, replacement) => {
            replacedUrls[oldUrl.replace(replacement, proxyAddress)] = oldUrl;
            return match.replace(replacement, proxyAddress);
        });
    };
}

function createReloadScript(liveSyncPort) {
    return `
        const socket = new WebSocket("ws://localhost:${liveSyncPort}");
        socket.onmessage = function(event) {
            if (event.data === 'reload') {
                window.location.reload();
            }
        };
    `;
}

function injectReloadScript(scriptText) {
    const injectionAncor = '</head>';
    const injection = `${injectionAncor}<script>${scriptText}</script>`;
    return function(responseText) {
        return responseText.replace(injectionAncor, injection);
    };
}

function getHostReplacer(requestServerParams, proxyPort) {
    return function replaceHost(str) {
        const urlReplacement = new RegExp(`http.*${requestServerParams.host}`);
        const proxyAddress = getProxyAddress(proxyPort);

        return str
            .replace(urlReplacement, proxyAddress)
            .replace(requestServerParams.hostname, PROXY_HOST);
    };
}

function getProxyAddress(proxyPort) {
    return `http://${PROXY_HOST}:${proxyPort}`;
}

module.exports = createProxyServer;
