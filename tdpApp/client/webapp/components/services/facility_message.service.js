'use strict';

angular.module('tdpApp')
    .factory('Facility_Message', function Template($location, $rootScope, $http, $q) {
        var results = {};

        return {

            /**
             * Find All Facility_Messages
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAllByFacilityID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/facility_message/byFacility/' + id).
                success(function(data) {
                    console.log('Facility_Message findAllByFacilityID:', data);
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
             * Find Single Facility_Message by Facility_Message ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findByID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/facility_message/' + id).
                success(function(data) {
                    console.log('Facility_Message findByID:', data);
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
             * Create a New Facility_Message
             *
             * @param  {Object}   facility_message object - query template
             *   {
             *      facility_id: 5,
             *      active: true,
             *      message_order: 5,
             *      message_text: 'This is the body of the message',
             *      message_headline: 'This is the headline of the message'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            create: function(facility_message, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/facility_message/', facility_message).
                success(function(data) {
                    console.log('createFacilityMessage - data:', data);
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
             * Update a Facility_Message
             *
             * @param  {Object}   template object - query template
             *   {
             *      id: 5,
             *      facility_id: 5,
             *      active: true,
             *      message_order: 5,
             *      message_text: 'This is the body of the message',
             *      message_headline: 'This is the headline of the message'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            update: function(facility_message, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/facility_message/' + facility_message.id, facility_message).
                success(function(data) {
                    console.log('updateFacilityMessage - data:', data);
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
             * Delete Single Facility_Message by Facility_Message ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            delete: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.delete('/api/facility_message/' + id).
                success(function(data) {
                    console.log('deleteFacilityMessage data:', data);
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
