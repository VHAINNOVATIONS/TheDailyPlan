'use strict';

var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

exports.index = function(req, res) {
  /*req.session.searchPatients({
      prefix: 'eig'
  }, function (err, body) {
      if (err) {
          done(err);
      } else {
          patients = body;
          done();
      }
  });*/

  res.status(200).json([
  {
    id: "7",
    lastName: "ONE",
    firstName: "PATIENT",
    ssn: 666061001,
    birthDate: 04151973,
    gender: "M"
  },
  {
    id: "8",
    lastName: "TWO",
    firstName: "PATIENT",
    ssn: 666051002,
    birthDate: 03151963,
    gender: "F"
  },
  {
    id: "9",
    lastName: "SIX",
    firstName: "PATIENT",
    ssn: 666061003,
    birthDate: 01151966,
    gender: "M"
  },
  {
    id: "10",
    lastName: "THREE",
    firstName: "PATIENT",
    ssn: 666051004,
    birthDate: 07181983,
    gender: "F"
  },
  {
    id: "11",
    lastName: "EIGHT",
    firstName: "PATIENT",
    ssn: 666061005,
    birthDate: 03111963,
    gender: "M"
  },
  {
    id: "12",
    lastName: "ONE",
    firstName: "PATIENTZZ",
    ssn: 666061006,
    birthDate: 02101969,
    gender: "F"
  },
  {
    id: "13",
    lastName: "SIX",
    firstName: "PATIENTZZ",
    ssn: 6660510011,
    birthDate: 09191969,
    gender: "M"
  }]);
};

/**
 * Search for Patients by Prefix
 */
exports.search = function (req, res, next) {
  var value = req.params.value;

  /*req.session.searchPatients({
      prefix: value
  }, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(body);
      }
  });*/
  res.status(200).json([
  {
    color: "red",
    value: "#f00"
  },
  {
    color: "green",
    value: "#0f0"
  },
  {
    color: "blue",
    value: "#00f"
  },
  {
    color: "cyan",
    value: "#0ff"
  },
  {
    color: "magenta",
    value: "#f0f"
  },
  {
    color: "yellow",
    value: "#ff0"
  },
  {
    color: "black",
    value: "#000"
  }]);
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
