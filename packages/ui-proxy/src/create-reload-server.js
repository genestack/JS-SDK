/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * This source code is distributed under the MIT license:
 * https://github.com/genestack/JS-SDK/tree/master/LICENSE
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
