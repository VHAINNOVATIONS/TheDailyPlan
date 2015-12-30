'use strict';

angular.module('tdpApp')
  .factory('Immunizations', function Immunizations($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Get Immunizations
       *
       * @param  {String}   value    - query value
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      getByEIN: function(value, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http({url: '/api/immunizations', method: 'GET', params: {value: value}}).
        success(function(data) {
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
