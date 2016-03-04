'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;
  var numDaysFuture = req.query.numDaysFuture;

  req.session.getVisits(patientId, {
    numDaysFuture: numDaysFuture
  }, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
