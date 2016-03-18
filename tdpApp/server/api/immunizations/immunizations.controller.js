'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;

  req.session.getImmunizations(req.user, patientId, {}, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
