/*
 * Copyright (c) 2011-2017 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const createStaticServer = require('./create-static-server');
const createProxyServer = require('./create-proxy-server');
const createReloadServer = require('./create-reload-server');

module.exports = function createProxy(args) {
    const reloadClients = createReloadServer(args);
    let updateBundles = null;

    chokidar.watch(args.buildPath).on('change', (event, path) => {
        const targetBundles = cutFileNames(getAllFiles(args.buildPath), args.buildPath);

        if (updateBundles === null) {
            createStaticServer(args);
            updateBundles = createProxyServer(args);
        }
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
