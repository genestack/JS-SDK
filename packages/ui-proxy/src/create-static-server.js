/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
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
        console.log(args.buildPath);
        console.log( // eslint-disable-line no-console
            `Static server started at http://localhost:${args.staticPort}`
        );
    });
};
