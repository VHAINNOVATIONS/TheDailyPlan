'use strict';

angular.module('tdpApp')
    .factory('Immunizations', function Immunizations($http) {
        return {
            columnDefs: [{
                name: 'date',
                displayName: 'Date',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'name',
                displayName: 'Immunization',
                width: '***',
                btsrpWidth: '9'
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
                var self = this;
                return $http(httpParams).then(function(response) {
                    var result = response.data;
                    result.columns = self.columnDefs;

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
