'use strict';

angular.module('tdpApp')
    .factory('Allergy', function Allergy($http) {
        return {
            columnDefs: [{
                name: 'allergenName',
                displayName: 'Name',
                width: '*'
            }, {
                name: 'reaction',
                displayName: 'Reaction',
                width: '*'
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
                    return result;
                });
            }
        };
    });
