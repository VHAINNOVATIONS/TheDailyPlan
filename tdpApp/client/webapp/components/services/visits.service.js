'use strict';

angular.module('tdpApp')
    .factory('Visits', function Visits($http) {
        return {
            columnDefs: [{
                name: 'time',
                displayName: 'Date',
                width: '*'
            }, {
                name: 'clinic',
                displayName: 'Clinic',
                width: '*'
            }, {
                name: 'status',
                displayName: 'Status',
                width: '*'
            }],
            loadingMsg: 'Loading future visits...',
            emptyMsg: 'No future visits found',

            /**
             * Get Visits
             *
             * @param  {String}   patientId    - query patientId
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            get: function(patientId, panelDetails) {
                var numDaysFuture = 30;
                panelDetails.forEach(function(pd) {
                    if (pd.setting_name === 'Future Days') {
                        numDaysFuture = pd.detail_value || pd.setting_value || 30;
                    }
                });
                var params = {
                    patientId: patientId,
                    numDaysFuture: numDaysFuture
                };
                var httpParams = {
                    url: '/api/visits',
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
