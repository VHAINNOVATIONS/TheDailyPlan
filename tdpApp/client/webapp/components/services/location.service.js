'use strict';

angular.module('tdpApp').factory('Location', function Location($location, $rootScope, $http, $q) {
    var clinics = null;
    var wards = null;

    $rootScope.$on('login-success', function() {
        clinics = null;
        wards = null;
    });

    return {
        /**
         * Get Clinics
         *
         * @return {Promise}
         */
        getClinics: function() {
            if (clinics === null) {
                return $http.get('/api/clinics').then(function(response) {
                    clinics = response.data;
                    return clinics;
                });
            } else {
                return $q.resolve(clinics);
            }
        },

        /**
         * Get Wards
         *
         * @return {Promise}
         */
        getWards: function() {
            if (wards === null) {
                return $http.get('/api/wards').then(function(response) {
                    wards = response.data;
                    return wards;
                });
            } else {
                return $q.resolve(wards);
            }
        }
    };
});
