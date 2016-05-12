'use strict';

angular.module('tdpApp')
    .factory('Labs', function Labs($http) {
        return {
            columnDefs: [{
                name: 'date',
                displayName: 'Date',
                width: '*'
            }, {
                name: 'name',
                displayName: 'Name',
                width: '**'
            }, {
                name: 'value',
                displayName: 'Value',
                width: '*'
            }, {
                name: 'units',
                displayName: 'Units',
                width: '*'
            }, {
                name: 'refRange',
                displayName: 'Range',
                width: '*'
            }],
            loadingMsg: 'Loading lab results...',
            emptyMsg: 'No lab results found',

            /**
             * Get Visits
             *
             * @param  {String}   patientId    - query patientId
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            get: function(patientId, panelDetails) {
                var tn = [];
                var occurances = '3';
                panelDetails.forEach(function(pd) {
                    if (pd.setting_name === 'Occurences') {
                        occurances = pd.detail_value || '3';
                        return;
                    }
                    if (pd.setting_name === 'Test Names') {
                        if (pd.detail_value) {
                          tn.push(pd.detail_value);
                        }
                    }
                });
                var params = {
                    patientId: patientId,
                    occurances: occurances
                };
                if (tn.length) {
                    params.testNames = tn;
                }
                var httpParams = {
                    url: '/api/labs',
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
