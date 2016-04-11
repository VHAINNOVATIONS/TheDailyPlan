'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;
  var options = {};
  var includeTypes = req.query.includeTypes;
  if (includeTypes) {
      options.includeTypes = includeTypes;
  }
  req.session.getPostings(req.user, patientId, options, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(body);
      }
  });
};
