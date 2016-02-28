'use strict';

angular.module('tdpApp')
  .factory('Medication', function Medication($location, $rootScope, $http, $q) {
    return {
      get: function(value, type, callback) {
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
      }
    };
  });

angular.module('tdpApp')
  .factory('IVMedication', function IVMedication(Medication) {
    return {
      get: function(patientId) {
        return Medication.get(patientId, 'iv');
      }
    };
  });

angular.module('tdpApp')
  .factory('InpatientMedication', function InpatientMedication(Medication) {
    return {
      get: function(patientId) {
        return Medication.get(patientId, 'inpatient');
      }
    };
  });

angular.module('tdpApp')
  .factory('OutpatientMedication', function OutpatientMedication(Medication) {
    return {
      get: function(patientId) {
        return Medication.get(patientId, 'outpatient');
      }
    };
  });


