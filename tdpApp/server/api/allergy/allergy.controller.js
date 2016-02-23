'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.value;

  req.session.getAllergies(patientId, {}, function (err, allergies) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(allergies);
      }
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
