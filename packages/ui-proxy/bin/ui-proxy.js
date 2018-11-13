#!/usr/bin/env node

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

const {
    DEFAULT_PROXY_PORT,
    DEFAULT_STATIC_PORT,
    DEFAULT_REPLACE_SERVER,
    DEFAULT_LIVESYNC_PORT
} = require('../src/constants');
const startProxy = require('../src/start-proxy');

if (!args.buildPath) {
    console.error('Argument "buildPath" is required, please see readme.md');
    process.exit();
}

startProxy({
    proxyPort: args.port || args.p || DEFAULT_PROXY_PORT,
    replaceServerUrl: args.server || args.s || DEFAULT_REPLACE_SERVER,
    // TODO remove these two arguments due to #7600
    staticPort: args['static-port'] || DEFAULT_STATIC_PORT,
    liveSyncPort: args['livesync-port'] || DEFAULT_LIVESYNC_PORT,
    noReload: args.reload === false,
    verbose: Boolean(args.v || args.verboze),
    production: Boolean(args.production),
    buildPath: path.resolve(process.cwd(), args['build-path'])
});
