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
            return {
                settingValue: setting.setting_value,
                panelSettingID: setting.id,
                panelTypeID: setting.panel_type_id,
                settingType: setting.setting_type,
                settingName: setting.setting_name
            };
        });
        return settings;
    }).then(function(settings) {
        return models.panel_type.find({
            where: {
                id: req.params.id
            }
        }).then(function(panelType) {
            var title = panelType.title;
            return models.Sequelize.Promise.map(settings, function(setting) {
                if (title === 'Health Factors') {
                    var sess = req.session;
                    var ghf = models.Sequelize.Promise.promisify(sess.getSystemHealthFactors, {
                        context: sess
                    });
                    return ghf(req.user).then(function(possibleValues) {
                        setting.possibleValues = possibleValues;
                    });
                }
            });
        }).then(function() {
            res.json(settings);
        });
    }).catch(function(err) {
        res.status(401).json(err);
    });
});

module.exports = router;
