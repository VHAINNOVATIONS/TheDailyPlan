"use strict";

var ewdRest = require('ewdrest');
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
    	default: 'tdp'
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

var params = {
	// REST server listener port
	restPort: config.tdpEwdRestPort,
	// service module mapping
	service: {
    },
    // EWD.js server mapping
	server: {
	}
};

params.service[config.ewdServiceName] = {
	module: config.ewdServiceModule,
	service: config.ewdServiceMethod,
	contentType: 'application/json'
};

params.server[config.ewdServerName] = {
	host: config.ewdServerHost,
	port: config.ewdServerPort,
	ssl: config.ewdServerSSL,
	secretKey: config.ewdServerSecretKey,
	accessId: config.ewdServerAccessId
};

if (process.argv.length > 2) {
    params.restPort = process.argv[2];
}

if (process.argv.length > 3) {
    params.server[config.ewdServerName].host = process.argv[3];
}

console.log(params);

ewdRest.start(params);