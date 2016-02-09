'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');
var async = require('async');


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

// get single panel_settings
router.get('/byPanelType/:id', function(req, res) {
  models.panel_setting.findAll({
    where: {
      panel_type_id: req.params.id
    }
  }).then(function(panel_setting) {
    var settings = [];
    var settingObj = {};
    var values = [];
    var settingTypeSave = 0;
    var settingNameSave = '';
    var i = 0;
    // Panel - Loop
    async.eachSeries(panel_setting, function(setting, callback) {
      i++;

      if (settingNameSave === '') {
        // Save Type & Name
        settingTypeSave = setting.setting_type;
        settingNameSave = setting.setting_name;

      } else if(settingNameSave !== setting.setting_name) {
        // Build Object
        settingObj = {};
        settingObj.settingValues = values;
        settingObj.panelTypeID = setting.panel_type_id;
        settingObj.settingType = settingTypeSave;
        settingObj.settingName = settingNameSave;
        settings.push(settingObj);
        // Prepare for next set
        settingTypeSave = setting.setting_type;
        settingNameSave = setting.setting_name;
        values =[];
      }
      var value = {};
      value.panelSettingID = setting.id;
      value.settingValue = setting.setting_value;
      values.push(value);

      // Final Push to settings array
      if (i === panel_setting.length) {
        settingObj = {};
        settingObj.settingValues = values;
        settingObj.panelTypeID = setting.panel_type_id;
        settingObj.settingType = settingTypeSave;
        settingObj.settingName = settingNameSave;
        settings.push(settingObj);
      }

      callback();

    }, function(err){

      if( err ) {
        console.log('ERROR:',err);
      } else {
        res.json(settings);
      }
    });
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
