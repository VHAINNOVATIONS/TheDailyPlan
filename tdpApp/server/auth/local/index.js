'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({
        message: 'Internal ewd server error.'
      });
    }
    var token = auth.signToken(user.authKey, user.authPort);
    res.json({
      token: token,
      user: user
    });
  })(req, res, next)
});

module.exports = router;
