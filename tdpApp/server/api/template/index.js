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

// get all templates by facility id
router.get('/facility/:id', function(req, res) {
  models.template.findAll({
    where: {
      facility_id: req.params.id
    }
  }).then(function(templates) {
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
      panelObj.panelid = panel.panel_id;
      panelObj.title = panel.title;
      panelObj.settings = {};
      panelObj.settings.sizeX = panel.sizeX;
      panelObj.settings.sizeY = panel.sizeY;
      panelObj.settings.minSizeX = panel.minSizeX;
      panelObj.settings.minSizeY = panel.minSizeY;
      panelObj.template = '<div ' + panel.directive + ' patient="ctrl.' + panel.scope_variable +'" panelid="panel.panelid"></div>';
      panelObj.print = '<div ' + panel.directive + '-print' + ' patient="ctrl.' + panel.scope_variable +'"></div>';
      panelObj.mandatory = panel.mandatory;
      console.log('<<<<< Template api1: ', panelObj);

      models.panel_detail.findAll({
        attributes: ['panel_setting_id'],
        where: {
          panel_id: panel.panel_id
        }
      }).then(function(panel_details) {
        if (panel_details) {
          console.log('<<<<< Template details: ', panel_details);
          panelObj.panelDetails = panel_details;
        }
      });
      console.log('<<<<< Template api2: ', panelObj);


      // TO DO replace with from database
      /*if (panel.title === 'Free Text 1') {
        panelObj.detail = 'Free Text 1'
      }
      if (panel.title === 'Free Text 2') {
        panelObj.detail = 'Name: |PATIENT NAME|, Age: |PATIENT AGE|'
      }
      if (panel.title === 'Free Text 3') {
        panelObj.detail = 'Name: |PATIENT NAME|\nSex: |PATIENT SEX|'
      }*/

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
  //Template = req.body;
  //Panels = req.body.panels;
  models.template.create({
    template_name: req.body.template_name,
    template_description: req.body.template_description,
    location_id: req.body.location_id,
    active: req.body.active,
    template_owner: req.body.template_owner
  }).then(function(template) {
    // Panel - Loop
    var i = 0;
    var layouts = [];
    async.eachSeries(req.body.panels, function(panel, callback) {
      // Count to define panel order
      i++;
      // Then Create the Panel Second
      models.panel.create({
        name: panel.title,
        panel_type_id: panel.id,
        sizeX: panel.minSizeX,
        sizeY: panel.minSizeY
      }).then(function(p) {
        // Then Create the Template_Layout Second
        models.template_layout.create({
          template_id: template.id,
          panel_id: p.id,
          panel_order: i
        }).then(function(tl) {
          // Create the panel_details
          for (var i = 0; i < panel.panelDetails.length; i++) {
            models.panel_detail.create({
              panel_id: p.id,
              panel_setting_id: panel.panelDetails[i].panel_setting_id,
            });
          }
          p.panelDetails = panel.panelDetails;
          tl.panel = p;
          layouts.push(tl);
          callback();
        });
      });

    }, function(err){

      if( err ) {
        console.log('ERROR:',err);
      } else {
        template.layouts = layouts;
        res.json(template);
      }
    });
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