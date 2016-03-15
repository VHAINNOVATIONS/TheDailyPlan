'use strict';

angular.module('tdpApp')
    .factory('HealthFactors', function HealthFactors($http) {
        return {
            columnDefs: [{
                name: 'name',
                displayName: 'Name',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'date',
                displayName: 'Date',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'location',
                displayName: 'Location',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'severity',
                displayName: 'Severity',
                width: '*',
                btsrpWidth: '3'
            }],
            loadingMsg: 'Loading health factors...',
            emptyMsg: 'No health factors found',

            /**
             * Get HealthFactors
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            get: function(patientId, panelDetails) {
                var self = this;
                var numDaysBack = 30;
                panelDetails.forEach(function(pd) {
                    if (pd.setting_name === 'Number of Back Days') {
                        numDaysBack = pd.detail_value || pd.setting_value || 30;
                    }
                });
                var params = {
                    patientId: patientId,
                    numDaysBack: numDaysBack
                };
                var httpParams = {
                    url: '/api/healthFactors',
                    method: 'GET',
                    params: params
                };
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
