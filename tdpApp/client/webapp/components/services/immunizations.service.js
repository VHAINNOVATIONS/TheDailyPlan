'use strict';

angular.module('tdpApp')
    .factory('Immunizations', function Immunizations($http) {
        return {
            columnDefs: [{
                name: 'date',
                displayName: 'Date',
                width: '*'
            }, {
                name: 'name',
                displayName: 'Immunization',
                width: '***'
            }],
            loadingMsg: 'Loading immunizations...',
            emptyMsg: 'No immunizations found.',
            get: function(patientId) {
                var httpParams = {
                    url: '/api/immunizations',
                    method: 'GET',
                    params: {
                        patientId: patientId
                    }
                };
                return $http(httpParams).then(function(response) {
                    var result = response.data;
                    return result;
                });
            }
        };
    });
