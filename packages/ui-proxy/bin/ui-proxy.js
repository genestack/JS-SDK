#!/usr/bin/env node

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

const {
    DEFAULT_PROXY_PORT,
    DEFAULT_REPLACE_SERVER
} = require('../src/constants');

const startProxy = require('../src/start-proxy');

if (!args._[0]) {
    console.error('Please, specify a path to build files, see README.md');
    process.exit();
 }

startProxy({
    proxyPort: args.port || args.p || DEFAULT_PROXY_PORT,
    replaceServerUrl: args.server || args.s || DEFAULT_REPLACE_SERVER,
    noReload: args.reload === false,
    buildPath: path.resolve(process.cwd(), args._[0])
});
