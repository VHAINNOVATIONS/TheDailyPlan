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
        var settings = panel_setting.map(function(setting) {
            var values = [];
            var value = {};
            value.panelSettingID = setting.id;
            value.settingValue = setting.setting_value;
            values.push(value);

            var settingObj = {};
            settingObj.settingValues = values;
            settingObj.panelTypeID = setting.panel_type_id;
            settingObj.settingType = setting.setting_type;
            settingObj.settingName = setting.setting_name;
            return settingObj;
        });

        res.json(settings);
    }).catch(function(err) {
        res.status(401).json(err);
    });
});

module.exports = router;
