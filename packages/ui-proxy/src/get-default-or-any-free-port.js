/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

const net = require('net');
const portfinder = require('portfinder');
const {COLOR_YELLOW} = require('./constants');

const isPortFree = (port) => new Promise((resolve, reject) => {
    const tester = net.createServer()
        .once('error', err => (err.code == 'EADDRINUSE' ? resolve(false) : reject(err)))
        .once('listening', () => tester.once('close', () => resolve(true)).close())
        .listen(port);
});

const getDefaultOrAnyFreePort = (port = 8000) => new Promise((resolve, reject) =>
    isPortFree(port)
        .then((isFree) => {
            if (isFree) {
                resolve(port);
            } else {
                console.log(COLOR_YELLOW, 'Another ui-proxy is running, please check it');
                return portfinder.getPortPromise().then(resolve);
            }
        }));

module.exports = getDefaultOrAnyFreePort;
