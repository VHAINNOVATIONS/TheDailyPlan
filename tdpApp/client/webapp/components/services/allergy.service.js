'use strict';

angular.module('tdpApp')
    .factory('Allergy', function Allergy($location, $rootScope, $http, $q) {
        return {
            columnDefs: [{
                name: 'allergenName',
                displayName: 'Name',
                width: '*',
                btsrpWidth: '6'
            }, {
                name: 'reaction',
                displayName: 'Reaction',
                width: '*',
                btsrpWidth: '6'
            }],
            loadingMsg: 'Loading allergies...',
            emptyMsg: 'No Allergy Assessment',

            /**
             * Get Allergy
             *
             * @param  {String}   patientId    - query patientId
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            get: function(patientId) {
                var httpParams = {
                    url: '/api/allergy',
                    method: 'GET',
                    params: {
                        patientId: patientId
                    }
                };
                var self = this;
                return $http(httpParams).then(function(response) {
                    var data = response.data;
                    self.emptyMsg = (data.status === null) ? 'No Allergy Assessment' : 'No Known Allergies';
                    var result = data.allergies || [];
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
