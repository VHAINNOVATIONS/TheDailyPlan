'use strict';
require('dotenv').load();
	
var db = require('../models/index');
db.sequelize
.sync({ force: true})
.then(function() {
    // seed the db - for use when sync({force: true})
    require('./seed')(db)
});