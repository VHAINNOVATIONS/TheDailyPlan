'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get single panel_settings
router.get('/byPanelType/:id', auth.isAuthenticated(), function(req, res) {
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
        panel_setting.forEach(function(setting) {
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
        });

        res.json(settings);
    }).catch(function(err) {
        res.status(401).json(err);
    });
});

module.exports = router;
