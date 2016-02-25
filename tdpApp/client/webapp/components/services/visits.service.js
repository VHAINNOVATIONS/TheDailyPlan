'use strict';

angular.module('tdpApp')
  .factory('Visits', function Visits($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Get Visits
       *
       * @param  {String}   patientId    - query patientId
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      getByID: function(patientId, numDaysFuture, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        var params = {
          patientId: patientId,
          numDaysFuture: numDaysFuture
        };
        $http({url: '/api/visits', method: 'GET', params: params}).
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
