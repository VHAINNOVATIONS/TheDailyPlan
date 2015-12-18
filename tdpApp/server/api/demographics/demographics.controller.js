'use strict';

var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Search for Patients by Prefix
 */
exports.index = function (req, res, next) {
  var value = req.query.value;

  req.session.getDemographics(value, {}, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(body);
      }
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
