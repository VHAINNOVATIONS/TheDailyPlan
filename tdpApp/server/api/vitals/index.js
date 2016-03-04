'use strict';

var express = require('express');
var controller = require('./vitals.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', auth.isAuthenticated(), controller.index);

module.exports = router;
