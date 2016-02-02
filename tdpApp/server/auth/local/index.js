'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {

  console.log('req.body:',req.body);
  req.session.login({
  	accessCode: req.body.accessCode,
  	verifyCode: req.body.verifyCode,
    userKeys: req.body.userKeys
  }, function(err, userData){
	if (err) {
		return res.status(401).json(err);
    } else {
      //Should return something like:
      /*res.status(200).json({
        DT: "DT",
        DUZ: "DUZ",
        username: "JSMITH",
        displayName: "SMITH, JOHN",
        greeting: "HELLO SMITH, JOHN"
      });*/
      res.status(200).json(userData);
    }
  })

  /*passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
  })(req, res, next)*/

});

module.exports = router;
