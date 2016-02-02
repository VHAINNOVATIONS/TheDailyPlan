'use strict';

var express = require('express');
var controller = require('./labs.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.index);
router.get('/byName/:id', controller.byName);


module.exports = router;
