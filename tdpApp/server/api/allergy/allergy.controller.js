'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;

  req.session.getAllergies(req.user, patientId, {}, function (err, allergies) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(allergies);
      }
  });
};
