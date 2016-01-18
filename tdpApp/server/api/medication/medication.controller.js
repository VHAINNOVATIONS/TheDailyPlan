'use strict';

exports.index = function (req, res, next) {
  var value = req.query.value;

  req.session.getMedications(value, req.query, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(body);
      }
  });
};
