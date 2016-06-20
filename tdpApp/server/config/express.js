/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var multer = require('multer')

var stagingPath = path.join(config.root, 'client/common/assets/landing_images/staging');

module.exports = function(app) {
    var env = app.get('env');
    var multerInstance = multer({dest: stagingPath}).array('files');
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(['/fu'], multer({
        dest: stagingPath,
        fileFilter: function fileFilter (req, file, cb) {
            console.log('INSIDEEDEDEDE');
            cb(null, true);
        }
    }).array('files'));
    app.use(['/api', '/auth'], compression());
    app.use(['/api', '/auth'], bodyParser.urlencoded({ extended: true }));
    app.use(['/api', '/auth'], bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(
      require('../auth/vista/vista.js')
    );
    app.use(passport.initialize());

    if ('production' === env) {
      app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
      app.use(express.static(path.join(config.root, 'public')));
      app.set('appPath', path.join(config.root, 'public'));
      app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
      app.use(require('connect-livereload')());
      app.use(express.static(path.join(config.root, '.tmp')));
      // RGS: Include common
      app.use(express.static(path.join(config.root, 'client')));
      app.use('/ionic', express.static(path.join(config.root, 'dist-ionic/www')));
      // app.use(express.static(path.join(config.root, 'client/common')));
      app.use(express.static(path.join(config.root, 'client/webapp')));
      app.set('appPath', path.join(config.root, 'client/webapp'));
      app.use(morgan('dev'));
      app.use(errorHandler()); // Error handler - has to be last
    }
};
