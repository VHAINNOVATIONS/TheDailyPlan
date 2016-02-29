'use strict';

angular.module('tdpApp')
  .factory('Medication', function Medication($http) {
    return {
      get: function(patientId, type, columnDefs) {
        var httpParams = {
          url: '/api/medication',
          method: 'GET',
          params: {
            value: patientId,
            type: type
          }
        };

        return $http(httpParams).then(function(response) {
          var result = response.data;
          result.columns = columnDefs;

          result.forEach(function(row) {
            row.columns = result.columns.map(function(p) {
              return {
                btsrpWidth: p.btsrpWidth,
                value: row[p.name]
              };
            });
          });
          return result;
        });
      }
    };
  });

angular.module('tdpApp')
  .factory('IVMedication', function IVMedication(Medication) {
    return {
      columnDefs: [{
        name: 'detail',
        displayName: 'Detail',
        width:'*',
        btsrpWidth: '6'
      }, {
        name: 'sig',
        displayName: 'Direction',
        width:'*',
        btsrpWidth: '6'
      }],
      loadingMsg: 'Loading IV medications...',
      emptyMsg: 'No IV Medications Found',

      get: function(patientId) {
        return Medication.get(patientId, 'iv', this.columnDefs);
      }
    };
  });

angular.module('tdpApp')
  .factory('InpatientMedication', function InpatientMedication(Medication) {
    return {
      columnDefs: [{
        name: 'name',
        displayName: 'Name',
        width:'*',
        btsrpWidth: '3'
      }, {
        name: 'dose',
        displayName: 'Dose',
        width:'*',
        btsrpWidth: '3'
      }, {
        name: 'route',
        displayName: 'Route',
        width:'*',
        btsrpWidth: '3'
      }, {
        name: 'schedule',
        displayName: 'Schedule',
        width:'*',
        btsrpWidth: '3'
      }],
      loadingMsg: 'Loading inpatient medications...',
      emptyMsg: 'No Inpatient Medications Found',

      get: function(patientId) {
        return Medication.get(patientId, 'inpatient', this.columnDefs);
      }
    };
  });

angular.module('tdpApp')
  .factory('OutpatientMedication', function OutpatientMedication(Medication) {
    return {
      columnDefs: [{
        name: 'detail',
        displayName: 'Detail',
        width:'*',
        btsrpWidth: '6'
      }, {
        name: 'sig',
        displayName: 'Direction',
        width:'*',
        btsrpWidth: '6'
      }],
      loadingMsg: 'Loading outpatient medications...',
      emptyMsg: 'No Outpatient Medications Found',

      get: function(patientId) {
        return Medication.get(patientId, 'outpatient', this.columnDefs);
      }
    };
  });
