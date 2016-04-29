'use strict';

angular.module('tdpApp')
    .factory('HealthFactors', function HealthFactors($http) {
        return {
            columnDefs: [{
                name: 'date',
                displayName: 'Date',
                width: '*'
            }, {
                name: 'name',
                displayName: 'Name',
                width: '***'
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
                var params = {
                    patientId: patientId,
                };
                if (panelDetails && panelDetails.length) {
                    var includeFactors = [];
                    panelDetails.forEach(function(pd) {
                        if (pd.setting_name === 'Include Factors') {
                            includeFactors.push(pd.detail_value);
                        }
                    });
                    if (includeFactors.length) {
                      params.includeFactors = includeFactors;
                    }
                }
                var httpParams = {
                    url: '/api/healthFactors',
                    method: 'GET',
                    params: params
                };
                return $http(httpParams).then(function(response) {
                    var result = response.data;
                    return result;
                });
            }
        };
    });
