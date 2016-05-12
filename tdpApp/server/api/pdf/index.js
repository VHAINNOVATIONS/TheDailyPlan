'use strict';

var express = require('express');
var controller = require('./pdf.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/generate', auth.isAuthenticated(), controller.index);

module.exports = router;
