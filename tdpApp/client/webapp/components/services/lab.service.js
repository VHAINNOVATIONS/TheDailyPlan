'use strict';

angular.module('tdpApp')
    .factory('Labs', function Labs($location, $rootScope, $http, $q, $filter) {
        var results = {};
        var labTestNames = [];
        var defaultTestNames = ['MAGNESIUM', 'POTASSIUM', 'HDL', 'TRIGLYCERIDE', 'CHOLESTEROL', 'CREATININE', 'HEMOGLOBIN A1C', 'LDL CHOLESTEROL'];

        return {

            /**
             * Get Labs
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */

            getByID: function(value, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                var parameters = {};
                var config = {};
                parameters.testNames = labTestNames.length > 0 ? labTestNames : defaultTestNames;
                console.log('Test Names: %s', parameters.testNames);
                config.params = parameters;

                $http.get('/api/labs/' + value, config).
                success(function(data) {
                    console.log('AFSIN %s', data.length);
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
             * Search Patients By Clinic
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            byName: function(value, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/labs/byName/' + value).
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
             * Panel Details - Get and Set
             */
            getLabTestNames: function() {
                return labTestNames;
            },
            setLabTestNames: function(value) {
                labTestNames = value;
            },
        };
    });
