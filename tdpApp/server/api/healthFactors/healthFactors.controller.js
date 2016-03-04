'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;
  var numDaysBack = req.query.numDaysBack;

  req.session.getHealthFactors(patientId, {
    numDaysBack: numDaysBack
  }, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
