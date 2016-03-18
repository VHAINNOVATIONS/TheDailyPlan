'use strict';

var express = require('express');
var controller = require('./labs.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', auth.isAuthenticated(), controller.index);
router.get('/byName/:id', auth.isAuthenticated(), controller.byName);

module.exports = router;
