'use strict';

var express = require('express');
var controller = require('./audit.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/user', auth.isAuthenticated(), controller.index);
router.post('/users', auth.isAuthenticated(), controller.multiple);

module.exports = router;
