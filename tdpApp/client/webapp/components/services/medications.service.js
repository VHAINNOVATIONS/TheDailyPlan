'use strict';

angular.module('tdpApp')
  .factory('Medication', function Medication($location, $rootScope, $http, $q) {
    return {
      getTypedMeds: function(value, type, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http({
          url: '/api/medication',
          method: 'GET',
          params: {
            value: value,
            type: type
          }
        }).success(function(data) {
          deferred.resolve(data);
          return cb();
        }).error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
      getIvMeds: function(value, callback) {
        return this.getTypedMeds(value, 'iv', callback);
      },
      getActiveInpatientMeds: function(value, callback) {
        return this.getTypedMeds(value, 'inpatient', callback);
      },
      getOutpatientMeds: function(value, callback) {
        return this.getTypedMeds(value, 'outpatient', callback);
      }
    };
  });
