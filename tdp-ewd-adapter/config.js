"use strict";

var dotenv = require('12factor-dotenv');

var config = dotenv({
    tdpEwdRestHost: {
        env: 'TDP_EWD_REST_HOST',
        type: 'string',
        default: 'localhost'
    },
    tdpEwdRestPort: {
        env: 'TDP_EWD_REST_PORT',
        type: 'integer',
        default: '8082'
    },
    ewdServiceName: {
        env: 'EWD_WEB_SERVICE_NAME',
        type: 'string',
        default: 'vista'
    },
    ewdServiceModule: {
        env: 'EWD_WEB_SERVICE_MODULE',
        type: 'string',
        default: 'raptor'
    },
    ewdServiceMethod: {
        env: 'EWD_WEB_SERVICE_METHOD',
        type: 'string',
        default: 'parse'
    },
    ewdServerName: {
        env: 'EWD_SERVER_NAME',
        type: 'string',
        default: 'tdp'
    },
    ewdServerHost: {
        env: 'EWD_SERVER_HOST',
        type: 'string'
    },
    ewdServerPort: {
        env: 'EWD_SERVER_PORT',
        type: 'integer',
        default: '8080'
    },
    ewdServerSSL: {
        env: 'EWD_SERVER_SSL',
        type: 'boolean',
        default: false
    },
    ewdServerSecretKey: {
        env: 'EWD_SERVER_SECRET_KEY',
        type: 'string'
    },
    ewdServerAccessId: {
        env: 'EWD_SERVER_ACCESS_ID',
        type: 'string'
    }
});

module.exports = exports = config;
