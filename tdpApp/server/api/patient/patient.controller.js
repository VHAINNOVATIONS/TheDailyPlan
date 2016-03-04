'use strict';

var async = require('async');
var merge = require('merge'), original, cloned;
var _ = require('lodash');

exports.index = function (req, res, next) {
  var value = req.params.id;

  req.session.searchPatients({
      prefix: value
  }, function (err, body) {
      if (err) {
        return res.status(401).json(err);
      } else {
        var fn = _.partial(getInfo, req.session);
        async.map(body, fn, function (err, result) {
          res.status(200).json(result);
        });
      }
  });
};

/**
 * Search for Patients by Clinic
 */
exports.byClinic = function (req, res, next) {
  var value = req.params.id;

  req.session.getPatientsByClinic({
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
        var fn = _.partial(getInfo, req.session);
        async.map(body, fn, function (err, result) {
          res.status(200).json(result);
        });
      }
  });
};

/**
 * Search for Patients by Ward
 */
exports.byWard = function (req, res, next) {
  var value = req.params.id;

  req.session.getPatientsByWard({
      wardId: value
  }, function (err, body) {
      if (err) {
        return res.status(401).json(err);
      } else {
        if (body.length > 0 && body[0].id === '') {
          return res.status(200).json([]);
        }
        var fn = _.partial(getInfo, req.session);
        async.map(body, fn, function (err, result) {
          res.status(200).json(result);
        });
      }
  });
};

function getInfo(session, item, callback) {
  setTimeout(function() {
    var merged = {};
    session.getDemographics(item.id, {}, function (err, body) {
      if (err) {
        callback(err, merged);
      } else {
        callback(null, merge(item,body));
      }
    });
  }, 1000);
}
