'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');
var _ = require('lodash');

// get all templates
router.get('/', auth.isAuthenticated(), function(req, res) {
    models.template.findAll({}).then(function(templates) {
        res.json(templates);
    });
});

// get all templates by facility id
router.get('/facility/:id', auth.isAuthenticated(), function(req, res) {
    models.template.findAll({
        where: {
            facility_id: req.params.id
        }
    }).then(function(templates) {
        res.json(templates);
    });
});

// get all templates by ward id
router.get('/ward/:id/:wardId', auth.isAuthenticated(), function(req, res) {
    models.template.findAll({
        where: {
            facility_id: req.params.id,
            location_id: req.params.wardId,
            location_type: 1
        }
    }).then(function(templates) {
        res.json(templates);
    });
});

// get all templates by ward id
router.get('/clinic/:id/:clinicId', auth.isAuthenticated(), function(req, res) {
    models.template.findAll({
        where: {
            facility_id: req.params.id,
            location_id: req.params.clinicId,
            location_type: 2
        }
    }).then(function(templates) {
        res.json(templates);
    });
});

// get single template
router.get('/:id', auth.isAuthenticated(), function(req, res) {
    models.template.find({
        where: {
            id: req.params.id
        }
    }).then(function(template) {
        res.json(template);
    });
});

// get complete template - use sequelize.query
router.get('/complete/:id', auth.isAuthenticated(), function(req, res) {
    models.sequelize.query('select * from template_layout tl ' +
            'inner join panel p on tl.panel_id = p.id ' +
            'inner join panel_type pt on p.panel_type_id = pt.id ' +
            'where template_id = $template_id order by panel_order asc', {
                bind: {
                    template_id: req.params.id
                },
                type: models.sequelize.QueryTypes.SELECT
            })
        .then(function(layout) {
            return models.Sequelize.Promise.map(layout, function(panel) {
                return models.sequelize.query('select panel_setting_id, detail_value, setting_type, setting_name, setting_value from panel_detail pd ' +
                        'inner join panel_setting ps on pd.panel_setting_id = ps.id ' +
                        'where pd.panel_id = $panel_id order by ps.setting_type asc, ' +
                        'ps.setting_name asc, ps.setting_value asc', {
                            bind: {
                                panel_id: panel.panel_id
                            },
                            type: models.sequelize.QueryTypes.SELECT
                        })
                    .then(function(panelDetails) {
                        var panelObj = {};
                        panelObj.panel_id = panel.panel_id;
                        panelObj.id = panel.panel_type_id;
                        panelObj.title = panel.title;
                        panelObj.settings = {};
                        panelObj.settings.sizeX = panel.sizeX;
                        panelObj.settings.sizeY = panel.sizeY;
                        panelObj.settings.minSizeX = panel.minSizeX;
                        panelObj.settings.minSizeY = panel.minSizeY;
                        panelObj.template = '<div ' + panel.directive + ' service="' + panel.service + '" patient="ctrl.' + panel.scope_variable + '" panelid="panel.panel_id" paneldetail="panel.panelDetails"></div>';
                        panelObj.print = '<div ' + panel.directive + '-print' + ' service="' + panel.service + '" patient="ctrl.' + panel.scope_variable + '" panelid="panel.panel_id" paneldetail="panel.panelDetails"></div>';
                        panelObj.mandatory = panel.mandatory;
                        panelObj.enable_options = panel.enable_options;
                        panelObj.highlightPanel = panel.highlightPanel;
                        panelObj.order = panel.panel_order;
                        if (panelDetails && panelDetails.length) {
                            panelObj.panelDetails = panelDetails;
                            for (var i = 0; i < panelDetails.length; ++i) {
                                var pd = panelDetails[i];
                                if (pd.setting_name === 'Title') {
                                    if (pd.detail_value) {
                                        panelObj.title = pd.detail_value;
                                    }
                                    break;
                                }
                            }
                        }
                        return panelObj
                    });
            })
        })
        .then(function(panels) {
            panels = _.sortBy(panels, 'order');
            return res.json(panels);
        })
        .catch(function(err) {
            return res.status(401).json(err);
        });
});

var fillTemplate = function(params) {
    var panelPromises = params.panels.map(function(panel, index) {
        return models.panel.create({
            name: panel.title,
            panel_type_id: panel.id,
            sizeX: panel.minSizeX,
            sizeY: panel.minSizeY
        }).then(function(p) {
            return models.template_layout.create({
                template_id: params.id,
                panel_id: p.id,
                panel_order: index
            }).then(function(tl) {
                if (panel.panelDetails) {
                    var pds = panel.panelDetails.map(function(panelDetail) {
                        var pd = {
                            panel_id: p.id,
                            panel_setting_id: panelDetail.panel_setting_id,
                        };
                        if (panelDetail.hasOwnProperty('detail_value')) {
                            pd.detail_value = panelDetail.detail_value;
                        }
                        return pd;
                    });
                    return models.panel_detail.bulkCreate(pds);
                } else {
                    return null;
                }
            });
        })
    });
    return models.Sequelize.Promise.all(panelPromises);
};

// add new template
router.post('/', auth.isAuthenticated(), function(req, res) {
    models.template.create({
        template_name: req.body.template_name,
        template_description: req.body.template_description,
        facility_id: req.body.facility_id,
        location_id: req.body.location_id,
        location_type: req.body.location_type,
        active: true,
        template_owner: req.body.template_owner
    }).then(function(template) {
        return {
            id: template.id,
            panels: req.body.panels
        };
    }).then(fillTemplate).then(function() {
        res.json({});
    }).catch(function(err) {
        console.log('ERROR:', err);
    });
});

// update single template
router.put('/:id', auth.isAuthenticated(), function(req, res) {
    var templateId = req.params.id;
    models.template.find({
        where: {
            id: templateId
        }
    }).then(function(template) {
        if (template) {
            return template.update({
                template_name: req.body.template_name,
                template_description: req.body.template_description,
                facility_id: req.body.facility_id,
                location_id: req.body.location_id,
                location_type: req.body.location_type,
                active: req.body.active,
                template_owner: req.body.template_owner
            }).then(function(template) {
                return models.template_layout.findAll({
                    where: {
                        template_id: templateId
                    }
                });
            }).then(function(layout) {
                return models.Sequelize.Promise.all(layout.map(function(panel) {
                    var id = panel.panel_id;
                    return models.panel_detail.destroy({
                        where: {
                            panel_id: id
                        }
                    }).then(function() {
                        return models.template_layout.destroy({
                            where: {
                                panel_id: id
                            }
                        })
                    }).then(function() {
                        return models.panel.destroy({
                            where: {
                                id: id
                            }
                        });
                    });
                }));
            }).then(function() {
                return {
                    id: templateId,
                    panels: req.body.panels
                };
            }).then(fillTemplate).then(function() {
                res.json({});
            });
        } else {
          res.status(401).json(new Error('Invalida template id'));
          return null;
        }
    }).catch(function(err) {
         res.status(401).json(err);
    });
});

// delete a single template
router.delete('/:id', auth.isAuthenticated(), function(req, res) {
    models.template.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(template) {
        res.json(template);
    });
});

module.exports = router;
