/*
 * Copyright (c) 2011-2017 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

const WebSocket = require('ws');

module.exports = function createReloadServer({liveSyncPort}) {
    const ws = new WebSocket.Server({
        perMessageDeflate: false,
        port: liveSyncPort
    });

    return function reloadClients() {
        ws.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload');
            }
        });
    };
};
