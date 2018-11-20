/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

const StaticServer = require('static-server');
const getDefaultOrAnyFreePort = require('./get-default-or-any-free-port');
const {DEFAULT_STATIC_PORT} = require('./constants');

module.exports = function createStaticServer(args) {
    return getDefaultOrAnyFreePort(DEFAULT_STATIC_PORT)
        .then((port) => {
            const server = new StaticServer({
                rootPath: args.buildPath,
                port,
                followSymlink: true
            });
            server.start((err) => {
                if (err) {
                    throw new Error(err);
                }
            });
            return port;
        });
};
