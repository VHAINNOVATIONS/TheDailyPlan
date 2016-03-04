'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
  }
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, port) {
  return jwt.sign({
    _id: id,
    _port: port
  }, config.secrets.session, {
    expiresInMinutes: 60*5
  });
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
