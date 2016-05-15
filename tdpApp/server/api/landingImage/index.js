'use strict';

var express = require('express');
var controller = require('./landingImage.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.index);
router.get('/active', controller.getActive);
router.get('/', auth.isAuthenticated(), controller.get);

module.exports = router;
