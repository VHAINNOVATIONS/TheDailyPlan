'use strict';

angular.module('tdpApp')
    .factory('Consults', function Postings($http) {
        return {
            columnDefs: [{
                name: 'requestDate',
                displayName: 'Request Date',
                width: '*'
            }, {
                name: 'service',
                displayName: 'Service',
                width: '**'
            }, {
                name: 'earliestDate',
                displayName: 'Earliest Date',
                width: '*'
            }],
            loadingMsg: 'Loading consults...',
            emptyMsg: 'No consults found',
            /**
             * Get Consults
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            get: function(patientId) {
                var params = {
                    patientId: patientId
                };
                var httpParams = {
                    url: '/api/consults',
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
