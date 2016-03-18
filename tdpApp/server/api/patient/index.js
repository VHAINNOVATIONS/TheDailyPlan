'use strict';

var express = require('express');
var controller = require('./patient.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', auth.isAuthenticated(), controller.index);
router.get('/byClinic/:id', auth.isAuthenticated(), controller.byClinic);
router.get('/byWard/:id', auth.isAuthenticated(), controller.byWard);

module.exports = router;
