'use strict';

var express = require('express');
var controller = require('./landingImage.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.index);

module.exports = router;
