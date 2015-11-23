"use strict";

var ewdRest = require('ewdrest');

var params = {
	// REST server listener port
	restPort: 8082,
	// service module mapping
	service: {
		vista: {
			module: 'VistARestServer',
			service: 'parse',
			contentType: 'application/json'
		}
     },
     // EWD.js server mapping
	server: {
		tdp: {
			host: '54.158.47.205',
			port: 8080,
			ssl: true,
			secretKey: 'TakeARest!',
			accessId: 'RESTServer'
		}
	}
};

ewdRest.start(params);