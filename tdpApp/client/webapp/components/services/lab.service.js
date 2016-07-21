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
                var backdays = '30';
                var isvertical = '1';
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
                    if(pd.setting_name === 'Back Days'){
                        backdays = pd.detail_value || '30';
                        return;
                    }
                    if(pd.setting_name === 'Test Names as PDF Table Header'){
                        isvertical = pd.detail_value || '1';
                        return;
                    }
                });
                var params = {
                    patientId: patientId,
                    occurances: occurances,
                    backdays:  backdays,
                    isvertical: isvertical
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
