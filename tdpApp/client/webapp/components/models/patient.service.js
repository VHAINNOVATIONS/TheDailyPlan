'use strict';

angular.module('tdpApp')
  .factory('Patient', function Patient($location, $rootScope, $http, $q) {
    var results = {};
    var selectedPatients = [];

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

        $http({url: '/api/patient', method: 'GET', params: {value: value}}).
        success(function(data) {
          console.log('PatientSearch:',data);
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
      getSelectedPatients: function() {
          return selectedPatients;
      },
      setSelectedPatients: function(value) {
          selectedPatients = value;
      }
    };
  });
