'use strict';

angular.module('tdpApp')
    .factory('Audit', function Audit($http) {
        return {
            create: function(accessInfo) {
                return $http.post('/api/audit/user', accessInfo);
            },
            bulkCreate: function(accessInfos) {
                return $http.post('/api/audit/users', accessInfos);
            },
        };
    });
