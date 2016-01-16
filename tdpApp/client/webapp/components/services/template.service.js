'use strict';

angular.module('tdpApp')
  .factory('Template', function Template($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Find All Templates
       *
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findAll: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/template/').
        success(function(data) {
          console.log('Template findAll:',data);
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
       * Find Single Template by Template ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findByID: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/template/' + id).
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
       * Create a New Template
       *
       * @param  {Object}   template object - query template
       *   {
       *      template_name: 'Surgery 3rd Floor East',
       *      template_description: 'The template for post-op',
       *      location_id: '4',
       *      active: 'true',
       *      template_owner: 'smithj'
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      create: function(template, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/template/', template).
        success(function(data) {
          console.log('createTemplate - data:',data);
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
       * Update a Template
       *
       * @param  {Object}   template object - query template
       *   {
       *      template_name: 'Surgery 3rd Floor East',
       *      template_description: 'The template for post-op',
       *      location_id: '4',
       *      active: 'true',
       *      template_owner: 'smithj'
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      update: function(template, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.put('/api/template/'+template.id, template).
        success(function(data) {
          console.log('updateTemplate - data:',data);
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
       * Delete Single Template by Template ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      delete: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.delete('/api/template/' + id).
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
      }

    };
  });
