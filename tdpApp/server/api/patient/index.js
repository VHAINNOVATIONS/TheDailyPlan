'use strict';

var express = require('express');
var controller = require('./patient.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.index);
router.get('/byClinic/:id', controller.byClinic);
router.get('/byWard/:id', controller.byWard);


module.exports = router;
