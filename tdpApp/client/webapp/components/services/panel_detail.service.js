'use strict';

angular.module('tdpApp')
  .factory('Panel_Detail', function Panel_Detail($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Find All Panel_Details
       *
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findAll: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/panel_detail/').
        success(function(data) {
          console.log('Panel_Detail findAll:',data);
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
       * Find Single Panel_Detail by Panel_Detail ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findByID: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/panel_detail/' + id).
        success(function(data) {
          console.log('Panel_Detail findByID:',data);
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
       * Find Complete Panel_Detail by Panel_Detail ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      findCompleteByID: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/panel_detail/complete/' + id).
        success(function(data) {
          console.log('Panel_Detail findCompleteByID:',data);
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
       * Create a New Panel_Detail
       *
       * @param  {Object}   panel_detail object - query panel_detail
       *   {
       *      panel_detail_name: 'Surgery 3rd Floor East',
       *      panel_detail_description: 'The panel_detail for post-op',
       *      location_id: '4',
       *      active: 'true',
       *      panel_detail_owner: 'smithj'
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      create: function(panel_detail, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/panel_detail/', panel_detail).
        success(function(data) {
          console.log('createPanel_Detail - data:',data);
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
       * Update a Panel_Detail
       *
       * @param  {Object}   panel_detail object - query panel_detail
       *   {
       *      panel_detail_name: 'Surgery 3rd Floor East',
       *      panel_detail_description: 'The panel_detail for post-op',
       *      location_id: '4',
       *      active: 'true',
       *      panel_detail_owner: 'smithj'
       *   }
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      update: function(panel_detail, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.put('/api/panel_detail/'+panel_detail.id, panel_detail).
        success(function(data) {
          console.log('updatePanel_Detail - data:',data);
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
       * Delete Single Panel_Detail by Panel_Detail ID
       *
       * @param  {String}   id    - query id
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      delete: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.delete('/api/panel_detail/' + id).
        success(function(data) {
          console.log('Panel_Detail findByID:',data);
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
