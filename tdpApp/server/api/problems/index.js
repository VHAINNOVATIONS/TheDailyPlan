'use strict';

var express = require('express');
var controller = require('./problems.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:value', controller.search);
//router.get('/:value', auth.isAuthenticated(), controller.search);


module.exports = router;
