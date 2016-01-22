'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all panel_settings
router.get('/', function(req, res) {
  models.panel_setting.findAll({}).then(function(panel_settings) {
    res.json(panel_settings);
  });
});

// get single panel_setting
router.get('/:id', function(req, res) {
  models.panel_setting.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel_setting) {
    res.json(panel_setting);
  });
});

// add new panel_setting
router.post('/', function(req, res) {
  models.panel_setting.create({
    panel_type_id: req.body.panel_type_id,
    setting_type: req.body.setting_type,
    setting_name: req.body.setting_name,
    setting_value: req.body.setting_value
  }).then(function(panel_setting) {
    res.json(panel_setting);
  });
});

// update single panel_setting
router.put('/:id', function(req, res) {
  models.panel_setting.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel_setting) {
    if(panel_setting){
      panel_setting.updateAttributes({
        panel_type_id: req.body.panel_type_id,
        setting_type: req.body.setting_type,
        setting_name: req.body.setting_name,
        setting_value: req.body.setting_value
      }).then(function(panel_setting) {
        res.send(panel_setting);
      });
    }
  });
});

// delete a single panel_setting
router.delete('/:id', function(req, res) {
  models.panel_setting.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(panel_setting) {
    res.json(panel_setting);
  });
});

module.exports = router;
