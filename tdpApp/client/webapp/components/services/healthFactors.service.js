'use strict';

angular.module('tdpApp')
  .factory('HealthFactors', function HealthFactors($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Get HealthFactors
       *
       * @param  {String}   value    - query value
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      getByID: function(value, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http({url: '/api/healthFactors', method: 'GET', params: {value: value}}).
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
