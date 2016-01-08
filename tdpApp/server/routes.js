/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/patient', require('./api/patient'));
  app.use('/api/demographics', require('./api/demographics'));
  app.use('/api/allergy', require('./api/allergy'));
  app.use('/api/problems', require('./api/problems'));
  app.use('/api/immunizations', require('./api/immunizations'));
  app.use('/api/vitals', require('./api/vitals'));
  app.use('/api/allOrders', require('./api/allOrders'));
  app.use('/api/clinics', require('./api/clinics'));
  app.use('/api/ordersAsClassified', require('./api/ordersAsClassified'));
  app.use('/api/radiologyReports', require('./api/radiologyReports'));
  app.use('/api/visits', require('./api/visits'));
  app.use('/api/wards', require('./api/wards'));


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
