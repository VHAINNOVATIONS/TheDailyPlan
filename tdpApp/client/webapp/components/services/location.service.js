'use strict';

angular.module('tdpApp')
    .factory('Location', function Location($location, $rootScope, $http, $q) {
        var results = {};

        return {

            /**
             * Get Clinics
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            getClinics: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/clinics').
                success(function(data) {
                    results = data;
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {

                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },

            /**
             * Get Wards
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            getWards: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/wards').
                success(function(data) {
                    console.log('Location.getWards:', data);
                    results = data;
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {

                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            }
        };
    });
