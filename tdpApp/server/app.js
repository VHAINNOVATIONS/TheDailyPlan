/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').load();

var express = require('express');
//var mongoose = require('mongoose');
var db = require('./models/index');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

db.sequelize
.sync({ force: false})
.then(function() {
    // seed the db - for use when sync({force: true})
    //require('../db/seed')(db);

    // Start server
    server.listen(config.port, config.ip, function () {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
});



// Expose app
exports = module.exports = app;
