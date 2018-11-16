/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
 */

const StaticServer = require('static-server');

module.exports = function createStaticServer(args) {
    const server = new StaticServer({
        rootPath: args.buildPath,
        port: args.staticPort,
        followSymlink: true
    });
    server.start((err) => {
        if (err) {
            throw new Error(err);
        }
        console.log( // eslint-disable-line no-console
            `Static server started at http://localhost:${args.staticPort}`
        );
    });
};
