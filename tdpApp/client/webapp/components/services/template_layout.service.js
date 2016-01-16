'use strict';

angular.module('tdpApp')
  .factory('Template_Layout', function Template($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Find All Template_Layouts
       *
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findAllByTemplateID: function(id,callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/template_layout/byTemplateID/'+id).
        success(function(data) {
          console.log('Template_Layout findAllByTemplateID:',data);
          results = data;
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {

          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Find Single Template_Layout by Template_Layout ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findByID: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/template_layout/' + id).
        success(function(data) {
          console.log('Template findByID:',data);
          results = data;
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {

          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Create a New Template_Layout
       *
       * @param  {Object}   template_layout object - query template
       *   {
       *      template_id: 5,
       *      panel_id: 6,
       *      panel_order: 5,
       *      optional: true
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      create: function(template_layout, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/template_layout/', template_layout).
        success(function(data) {
          console.log('createTemplateLayout - data:',data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {

          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Update a Template_Layout
       *
       * @param  {Object}   template object - query template
       *   {
       *      id: 5,
       *      template_id: 5,
       *      panel_id: 6,
       *      panel_order: 5,
       *      optional: true
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      update: function(template_layout, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.put('/api/template_layout/'+template_layout.id, template_layout).
        success(function(data) {
          console.log('updateTemplateLayout - data:',data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {

          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete Single Template_Layout by Template_Layout ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      delete: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.delete('/api/template_layout/' + id).
        success(function(data) {
          console.log('deleteTemplateLayout data:',data);
          results = data;
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {

          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      }

    };
  });
