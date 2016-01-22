'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all panel_details
router.get('/', function(req, res) {
  models.panel_detail.findAll({}).then(function(panel_details) {
    res.json(panel_details);
  });
});

// get single panel_detail
router.get('/:id', function(req, res) {
  models.panel_detail.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel_detail) {
    res.json(panel_detail);
  });
});

// add new panel_detail
router.post('/', function(req, res) {
  models.panel_detail.create({
    panel_id: req.body.panel_id,
    panel_setting_id: req.body.panel_setting_id,
    detail_value: req.body.detail_value
  }).then(function(panel_detail) {
    res.json(panel_detail);
  });
});

// update single panel_detail
router.put('/:id', function(req, res) {
  models.panel_detail.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel_detail) {
    if(panel_detail){
      panel_detail.updateAttributes({
        panel_id: req.body.panel_id,
        panel_setting_id: req.body.panel_setting_id,
        detail_value: req.body.detail_value
      }).then(function(panel_detail) {
        res.send(panel_detail);
      });
    }
  });
});

// delete a single panel_detail
router.delete('/:id', function(req, res) {
  models.panel_detail.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(panel_detail) {
    res.json(panel_detail);
  });
});

module.exports = router;
