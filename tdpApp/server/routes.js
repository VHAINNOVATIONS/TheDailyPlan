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
  app.use('/api/postings', require('./api/postings'));
  app.use('/api/medication', require('./api/medication'));
  app.use('/api/immunizations', require('./api/immunizations'));
  app.use('/api/vitals', require('./api/vitals'));
  app.use('/api/clinics', require('./api/clinics'));
  app.use('/api/orders', require('./api/orders'));
  app.use('/api/visits', require('./api/visits'));
  app.use('/api/wards', require('./api/wards'));
  app.use('/api/labs', require('./api/labs'));
  app.use('/api/freetextresolve', require('./api/freeTextResolve'));
  app.use('/api/landing_image', require('./api/landingImage'));

  // TDP DB API Routes
  app.use('/api/template',require('./api/template'));
  app.use('/api/panel',require('./api/panel'));
  app.use('/api/panel_setting',require('./api/panel_setting'));
  app.use('/api/panel_type',require('./api/panel_type'));
  app.use('/api/facility',require('./api/facility'));
  app.use('/api/facility_message',require('./api/facility_message'));
  app.use('/api/audit',require('./api/audit'));
  app.use('/api/pdf',require('./api/pdf'));

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
