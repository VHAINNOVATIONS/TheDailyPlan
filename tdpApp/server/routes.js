/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var models = require('./models/index');

module.exports = function(app) {

  // EWD API Routes
  app.use('/api/patient', require('./api/patient'));
  app.use('/api/demographics', require('./api/demographics'));
  app.use('/api/allergy', require('./api/allergy'));
  app.use('/api/healthFactors', require('./api/healthFactors'));
  app.use('/api/medication', require('./api/medication'));
  app.use('/api/problems', require('./api/problems'));
  app.use('/api/immunizations', require('./api/immunizations'));
  app.use('/api/vitals', require('./api/vitals'));
  app.use('/api/allOrders', require('./api/allOrders'));
  app.use('/api/clinics', require('./api/clinics'));
  app.use('/api/ordersAsClassified', require('./api/ordersAsClassified'));
  app.use('/api/radiologyReports', require('./api/radiologyReports'));
  app.use('/api/visits', require('./api/visits'));
  app.use('/api/wards', require('./api/wards'));
  app.use('/api/labs', require('./api/labs'));
  app.use('/api/freetextresolve', require('./api/freeTextResolve'));

  // TDP DB API Routes
  app.use('/api/template',require('./api/template'));
  app.use('/api/template_layout',require('./api/template_layout'));
  app.use('/api/panel',require('./api/panel'));
  app.use('/api/panel_detail',require('./api/panel_detail'));
  app.use('/api/panel_setting',require('./api/panel_setting'));
  app.use('/api/panel_type',require('./api/panel_type'));
  app.use('/api/facility',require('./api/facility'));
  app.use('/api/facility_message',require('./api/facility_message'));
  app.use('/api/audit',require('./api/audit'));


  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
