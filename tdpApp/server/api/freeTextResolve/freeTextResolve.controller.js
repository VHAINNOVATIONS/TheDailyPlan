'use strict';

exports.index = function (req, res, next) {
  var value = req.query.value;
  var text = req.query.text;

  req.session.getBoilerplates(value, {
    text: text
  }, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
