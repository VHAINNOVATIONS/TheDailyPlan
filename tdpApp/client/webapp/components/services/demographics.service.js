'use strict';

angular.module('tdpApp')
    .factory('Demographics', function Demographics($location, $rootScope, $http, $q) {
        var self = this;
        var results = {};
        var demographics = {};

        return {

            /**
             * Get Demographics
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            getByID: function(value, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/demographics/' + value).
                success(function(data) {
                    data.id = value;
                    results = data;
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {

                    deferred.reject(err);
                    return cb(err);
                }.bind(self));

                return deferred.promise;
            },

            getDemographics: function(id) {
                if (demographics.id !== id) {
                    demographics = {};
                }
                return demographics;

            },

            setDemographics: function(demographicsObject) {
                demographics = demographicsObject;
            },
        };
    });
