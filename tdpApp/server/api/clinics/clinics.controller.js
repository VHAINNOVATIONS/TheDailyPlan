'use strict';

exports.index = function (req, res, next) {
  req.session.getClinics({}, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
