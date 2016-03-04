'use strict';

exports.index = function (req, res, next) {
  var value = req.query.value;

  req.session.getOrdersAsClassified(value, {}, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          res.status(200).json(body);
      }
  });
};
