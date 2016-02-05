'use strict';

var express = require('express');
var router = express.Router();
var models = require('../../models/index');

router.post('/user', function(req, res) {
  models.user_audit.create({
    user_id_vista: req.body.userId,
    patient_id_vista: req.body.patientId,
    action: req.body.action
  }).then(function(user_audit) {
    res.send(user_audit);
  });
});

module.exports = router;
