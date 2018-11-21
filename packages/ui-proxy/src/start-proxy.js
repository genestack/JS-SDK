/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const createStaticServer = require('./create-static-server');
const createProxyServer = require('./create-proxy-server');
const createReloadServer = require('./create-reload-server');

module.exports = async function createProxy(args) {
    const {reloadClients, liveSyncPort} = await createReloadServer();
    const staticPort = await createStaticServer(args);
    const updateBundles = createProxyServer({...args, staticPort, liveSyncPort});

    let targetBundles = cutFileNames(getAllFiles(args.buildPath), args.buildPath);

    if (targetBundles.length) {
        updateBundles(targetBundles);
    }

    chokidar.watch(args.buildPath, {awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 200
    }}).on('change', (event, path) => {
        targetBundles = cutFileNames(getAllFiles(args.buildPath), args.buildPath);
        console.log(`${new Date()}: files change detected${args.noReload ? '' : ', reloading...'}`);
        updateBundles(targetBundles);
        reloadClients();
    });
}

const getAllFiles = (dir) =>
    fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file);
        return fs.statSync(name).isDirectory() ?
            [...files, ...getAllFiles(name)]
            : [...files, name];
    }, []);

const cutFileNames = (files, textToCut) => files.map((file) => file.replace(textToCut, ''));
