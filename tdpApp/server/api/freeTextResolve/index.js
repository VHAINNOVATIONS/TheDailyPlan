'use strict';

var express = require('express');
var controller = require('./freeTextResolve.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);

module.exports = router;
