'use strict';

var models = require('../../models/index');

exports.index = function(req, res) {
  models.user_audit.create({
    user_id_vista: req.body.userId,
    patient_id_vista: req.body.patientId,
    action: req.body.action
  }).then(function(user_audit) {
    res.send(user_audit);
  });
};
