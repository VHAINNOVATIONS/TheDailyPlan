'use strict';

angular.module('tdpApp')
    .factory('Medication', function Medication($http) {
        return {
            get: function(patientId, type) {
                var httpParams = {
                    url: '/api/medication',
                    method: 'GET',
                    params: {
                        patientId: patientId,
                        type: type
                    }
                };

                return $http(httpParams).then(function(response) {
                    var result = response.data;
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
                width: '*'
            }, {
                name: 'sig',
                displayName: 'Direction',
                width: '*'
            }],
            loadingMsg: 'Loading IV medications...',
            emptyMsg: 'No IV Medications Found',

            get: function(patientId) {
                return Medication.get(patientId, 'iv');
            }
        };
    });

angular.module('tdpApp')
    .factory('InpatientMedication', function InpatientMedication(Medication) {
        return {
            columnDefs: [{
                name: 'name',
                displayName: 'Name',
                width: '*'
            }, {
                name: 'dose',
                displayName: 'Dose',
                width: '*'
            }, {
                name: 'route',
                displayName: 'Route',
                width: '*'
            }, {
                name: 'schedule',
                displayName: 'Schedule',
                width: '*'
            }],
            loadingMsg: 'Loading inpatient medications...',
            emptyMsg: 'No Inpatient Medications Found',

            get: function(patientId) {
                return Medication.get(patientId, 'inpatient');
            }
        };
    });

angular.module('tdpApp')
    .factory('OutpatientMedication', function OutpatientMedication(Medication) {
        return {
            columnDefs: [{
                name: 'detail',
                displayName: 'Detail',
                width: '*'
            }, {
                name: 'sig',
                displayName: 'Direction',
                width: '*'
            }],
            loadingMsg: 'Loading outpatient medications...',
            emptyMsg: 'No Outpatient Medications Found',

            get: function(patientId) {
                return Medication.get(patientId, 'outpatient');
            }
        };
    });
