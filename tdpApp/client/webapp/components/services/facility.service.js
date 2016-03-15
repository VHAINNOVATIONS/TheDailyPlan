'use strict';

angular.module('tdpApp')
    .factory('Facility', function Facility($location, $rootScope, $http, $q) {
        var results = {};
        var currentFacility = null;

        return {
            getCurrentFacility: function() {
                return currentFacility;
            },
            setCurrentFacility: function(value) {
                currentFacility = value;
            },

            /**
             * Find All Facilitys
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAll: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/facility/').
                success(function(data) {
                    console.log('Facility findAll:', data);
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
             * Find Single Facility by Facility ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findByID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/facility/' + id).
                success(function(data) {
                    console.log('Facility findByID:', data);
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
             * Create a New Facility
             *
             * @param  {Object}   facility object - query facility
             *   {
             *      name: 'Bilox',
             *      station: 520,
             *      visn: 16,
             *      server: 'some address'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            create: function(facility, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/facility/', facility).
                success(function(data) {
                    console.log('createFacility - data:', data);
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
             * Update a Facility
             *
             * @param  {Object}   facility object - query facility
             *   {
             *      id: 1,
             *      name: 'Bilox',
             *      station: 520,
             *      visn: 16,
             *      server: 'some address'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            update: function(facility, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/facility/' + facility.id, facility).
                success(function(data) {
                    console.log('updateFacility - data:', data);
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
             * Delete Single Facility by Facility ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            delete: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.delete('/api/facility/' + id).
                success(function(data) {
                    console.log('Facility findByID:', data);
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
