"use strict";

var ewdRest = require('ewdrest');
var dotenv = require('dotenv');
var getenv = require('getenv');

dotenv.load();

var params = {
	// REST server listener port
	restPort: getenv.int('TDP_EWD_REST_PORT'),
	// service module mapping
	service: {
    },
    // EWD.js server mapping
	server: {
	}
};

params.service[getenv('EWD_WEB_SERVICE_NAME')] = {
	module: getenv('EWD_WEB_SERVICE_MODULE'),
	service: getenv('EWD_WEB_SERVICE_METHOD')
};

params.server[getenv('EWD_SERVER_NAME')] = {
	host: getenv('EWD_SERVER_HOST'),
	port: getenv.int('EWD_SERVER_PORT'),
	ssl: getenv.bool('EWD_SERVER_SSL'),
	secretKey: getenv('EWD_SERVER_SECRET_KEY'),
	accessId: getenv('EWD_SERVER_ACCESS_ID')
};

ewdRest.start(params);