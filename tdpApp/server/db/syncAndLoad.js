'use strict';

require('dotenv').load();

var db = require('../models/index');

db.sequelize
    .sync({
        force: true
    })
    .then(function() {
        // seed the db - for use when sync({force: true})
        return require('./seed')(db);
    })
    .then(function() {
        console.log('Success seeding the database');
        process.exit(0);
    })
    .catch(function(err) {
        console.log('Errors happened during seeding.')
        console.log(err);
        process.exit(1);
    });
