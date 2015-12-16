'use strict';

angular.module('tdpApp')
  .factory('Patient', function Patient($location, $rootScope, $http, $q) {
    var results = {};

    return {

      /**
       * Search All Patients
       *
       * @param  {String}   value    - query value
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      searchAll: function(value, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/patient', value).
        success(function(data) {
          results = data;
          console.log('patient.service data:',data);
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
