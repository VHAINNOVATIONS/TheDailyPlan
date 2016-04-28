'use strict';

angular.module('tdpApp')
    .factory('Postings', function Postings($http) {
        return {
            columnDefs: [{
                name: 'entryDate',
                displayName: 'Date',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'type',
                displayName: 'Type',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'text',
                displayName: 'Text',
                width: '**',
                btsrpWidth: '6'
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
                var self = this;
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
