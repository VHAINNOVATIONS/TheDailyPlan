'use strict';

var async = require('async');
var merge = require('merge'), original, cloned;

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Search for Patients by Prefix
 */
exports.index = function (req, res, next) {
  var id = req.params.id;
  var options = req.query;

  req.session.getChemHemReports(req.user, id, options, function (err, body) {
      if (err) {
        return res.status(401).json(err);
      } else {
        res.status(200).json(body);
      }
  });
};

/**
 * Search for Labs by Clinic
 */
exports.byName = function (req, res, next) {
  var value = req.params.id;

  req.session.getPatientsByClinic(req.user, {
      clinicId: value,
      fromDate: '3150909',
      toDate: '3160707'
  }, function (err, body) {
    if (err) {
      return res.status(401).json(err);
    } else {
      if (body.length > 0 && body[0].id === '') {
        return res.status(200).json([]);
      }
      async.map(body, getInfo, function (err, result) {
        res.status(200).json(result);
      });
    }
  });
};
