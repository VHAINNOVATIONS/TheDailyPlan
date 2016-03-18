'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function () {
  passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'accessCode',
    passwordField: 'verifyCode'
  }, function(req, email, password, done) {
      if (! req.session) {
        return done(null, false, {
          message: 'Internal error obtaining session.'
        });
      }
      req.session.login({
        accessCode: req.body.accessCode,
        verifyCode: req.body.verifyCode,
        location: req.body.location,
        userKeys: req.body.userKeys
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Internal ewd server error.'
          });
        }
        return done(null, user);
      });
    }
  ));
};
