'use strict';

angular.module('tdpApp')
  .factory('Panel', function panel($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Find All panels
       *
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findAll: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/panel/').
        success(function(data) {
          console.log('Panel findAll:',data);
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
       * Find Single panel by panel ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findByID: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/panel/' + id).
        success(function(data) {
          console.log('panel findByID:',data);
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
       * Create a New panel
       *
       * @param  {Object}   panel object - query panel
       *   {
       *      name: 'Allergy Panel',
       *      panel_type_id: 3,
       *      location_id: 33,
       *      description: 'This panel does what',
       *      sizeX: 3,
       *      sizeY: 3
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      create: function(panel, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/panel/', panel).
        success(function(data) {
          console.log('createPanel - data:',data);
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
       * Update a panel
       *
       * @param  {Object}   panel object - query panel
       *   {
       *      id: 4,
       *      name: 'Allergy Panel',
       *      panel_type_id: 3,
       *      location_id: 33,
       *      description: 'This panel does what',
       *      sizeX: 3,
       *      sizeY: 3
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      update: function(panel, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.put('/api/panel/'+panel.id, panel).
        success(function(data) {
          console.log('updatePanel - data:',data);
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
       * Delete Single panel by panel ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      delete: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.delete('/api/panel/' + id).
        success(function(data) {
          console.log('Panel findByID:',data);
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
