'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;

  req.session.getMedications(req.user, patientId, req.query, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(body);
      }
  });
};
