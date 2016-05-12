'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;
  var includeFactors = req.query.includeFactors;

  req.session.getHealthFactors(req.user, patientId, {
    includeFactors: includeFactors
  }, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
