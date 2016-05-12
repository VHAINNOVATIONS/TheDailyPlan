'use strict';

angular.module('tdpApp')
    .factory('Postings', function Postings($http) {
        return {
            columnDefs: [{
                name: 'entryDate',
                displayName: 'Date',
                width: '*'
            }, {
                name: 'type',
                displayName: 'Type',
                width: '*'
            }, {
                name: 'text',
                displayName: 'Text',
                width: '**'
            }],
            loadingMsg: 'Loading postings...',
            emptyMsg: 'No postings found',
            /**
             * Get ClinicalWarnings
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            get: function(patientId, panelDetails) {
                var params = {
                    patientId: patientId
                };

                if (panelDetails && panelDetails.length) {
                    var includeTypes = [];
                    panelDetails.forEach(function(pd) {
                        if (pd.setting_name === 'Include Types') {
                            if (pd.detail_value) {
                                includeTypes.push(pd.detail_value);
                            }
                        }
                    });
                    if (includeTypes.length) {
                        params.includeTypes = includeTypes;
                    }
                }
                var httpParams = {
                    url: '/api/postings',
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
