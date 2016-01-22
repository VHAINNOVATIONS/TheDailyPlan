'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');
var async = require('async');


// get all templates
router.get('/', function(req, res) {
  models.template.findAll({}).then(function(templates) {
    res.json(templates);
  });
});

// get single template
router.get('/:id', function(req, res) {
  models.template.find({
    where: {
      id: req.params.id
    }
  }).then(function(template) {
    res.json(template);
  });
});

// get complete template - use sequelize.query
router.get('/complete/:id', function(req, res) {
  models.sequelize.query('select * from template_layout tl ' +
    'inner join panel p on tl.panel_id = p.id ' +
    'inner join panel_type pt on p.panel_type_id = pt.id ' +
    'where template_id = $template_id order by panel_order asc',
  { bind: {template_id: req.params.id}, type: models.sequelize.QueryTypes.SELECT})
  .then(function(layout) {
    var panels = [];

    // Panel - Loop
    async.eachSeries(layout, function(panel, callback) {
      var panelObj = {};
      panelObj.title = panel.title;
      panelObj.settings = {};
      panelObj.settings.sizeX = panel.sizeX;
      panelObj.settings.sizeY = panel.sizeY;
      panelObj.settings.minSizeX = panel.minSizeX;
      panelObj.settings.minSizeY = panel.minSizeY;
      panelObj.template = '<div ' + panel.directive + ' patient="ctrl.' + panel.scope_variable +'"></div>';
      panelObj.print = '<div ' + panel.directive + '-print' + ' patient="ctrl.' + panel.scope_variable +'"></div>';
      panelObj.mandatory = panel.mandatory;
      panels.push(panelObj);
      callback();

    }, function(err){

      if( err ) {
        console.log('ERROR:',err);
      } else {
        res.json(panels);
      }
    });
  });
});

// add new template
router.post('/', function(req, res) {
  models.template.create({
    template_name: req.body.template_name,
    template_description: req.body.template_description,
    location_id: req.body.location_id,
    active: req.body.active,
    template_owner: req.body.template_owner
  }).then(function(template) {
    res.json(template);
  });
});

// update single template
router.put('/:id', function(req, res) {
  models.template.find({
    where: {
      id: req.params.id
    }
  }).then(function(template) {
    if(template){
      template.updateAttributes({
        template_name: req.body.template_name,
        template_description: req.body.template_description,
        location_id: req.body.location_id,
        active: req.body.active,
        template_owner: req.body.active
      }).then(function(template) {
        res.send(template);
      });
    }
  });
});

// delete a single template
router.delete('/:id', function(req, res) {
  models.template.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(template) {
    res.json(template);
  });
});

module.exports = router;
