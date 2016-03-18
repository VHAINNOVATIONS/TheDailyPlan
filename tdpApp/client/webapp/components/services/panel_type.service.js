'use strict';

angular.module('tdpApp')
    .factory('Panel_Type', function Panel_Type($location, $rootScope, $http, $q) {
        var results = {};

        return {

            /**
             * Find All Panel_Types
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAll: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/panel_type/').
                success(function(data) {
                    console.log('Panel_Type findAll:', data);
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
             * Find All Panel_Types By Facility ID
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAllByFacilityID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/panel_type/facility/' + id).
                success(function(data) {
                    console.log('Panel_Type findAllByFacilityID:', data);
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
             * Find Single Panel_Type by Panel_Type ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findByID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/panel_type/' + id).
                success(function(data) {
                    console.log('Panel_Type findByID:', data);
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
             * Create a New Panel_Type
             *
             * @param  {Object}   panel_type object - query panel_type
             *   {
             *      title: 'Allergy Panel',
             *      directive: 'dt-allergy',
             *      scope_variable: 'patient.,
             *      minSizeX: 2,
             *      minSizeY: 2
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            create: function(panel_type, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/panel_type/', panel_type).
                success(function(data) {
                    console.log('createPanel_Type - data:', data);
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
             * Update a Panel_Type
             *
             * @param  {Object}   panel_type object - query panel_type
             *   {
             *      id: 3,
             *      title: 'Allergy Panel',
             *      directive: 'dt-allergy',
             *      scope_variable: 'patient.,
             *      minSizeX: 2,
             *      minSizeY: 2
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            update: function(panel_type, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/panel_type/' + panel_type.id, panel_type).
                success(function(data) {
                    console.log('updatePanel_Type - data:', data);
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
             * Delete Single Panel_Type by Panel_Type ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            delete: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.delete('/api/panel_type/' + id).
                success(function(data) {
                    console.log('Panel_Type findByID:', data);
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
