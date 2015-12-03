'use strict';

var express = require('express');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
	console.log("were here", req);
  req.session.login({
  	accessCode: req.body.accessCode,
  	verifyCode: req.body.verifyCode
  }, function(err, userData){
	if (err) {
		return res.status(401).json(err);
    } else {
        res.status(200).json(userData);
    }
  })
});

module.exports = router;