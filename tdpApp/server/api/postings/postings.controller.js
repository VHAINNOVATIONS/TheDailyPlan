'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;

  req.session.getPostings(req.user, patientId, {}, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(body);
      }
  });
};
