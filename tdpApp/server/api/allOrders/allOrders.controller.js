'use strict';

exports.index = function (req, res, next) {
  var value = req.query.value;

  req.session.getAllOrders(req.user, value, {}, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
