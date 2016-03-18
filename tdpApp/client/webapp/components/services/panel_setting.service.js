'use strict';

angular.module('tdpApp')
    .factory('Panel_Setting', function Panel_Setting($location, $rootScope, $http, $q) {
        var results = {};

        return {

            /**
             * Find All Panel_Settings
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAll: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/panel_setting/').
                success(function(data) {
                    console.log('Panel_Setting findAll:', data);
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
             * Find Single Panel_Setting by Panel_Setting ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findByID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/panel_setting/' + id).
                success(function(data) {
                    console.log('Panel_Setting findByID:', data);
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
             * Find Complete Panel_Setting by Panel_Type ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findByPanelTypeID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/panel_setting/byPanelType/' + id).
                success(function(data) {
                    console.log('Panel_Setting findByPanelTypeID:', data);
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
             * Create a New Panel_Setting
             *
             * @param  {Object}   panel_setting object - query panel_setting
             *   {
             *      panel_setting_name: 'Surgery 3rd Floor East',
             *      panel_setting_description: 'The panel_setting for post-op',
             *      location_id: '4',
             *      active: 'true',
             *      panel_setting_owner: 'smithj'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            create: function(panel_setting, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/panel_setting/', panel_setting).
                success(function(data) {
                    console.log('createPanel_Setting - data:', data);
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
             * Update a Panel_Setting
             *
             * @param  {Object}   panel_setting object - query panel_setting
             *   {
             *      panel_setting_name: 'Surgery 3rd Floor East',
             *      panel_setting_description: 'The panel_setting for post-op',
             *      location_id: '4',
             *      active: 'true',
             *      panel_setting_owner: 'smithj'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            update: function(panel_setting, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/panel_setting/' + panel_setting.id, panel_setting).
                success(function(data) {
                    console.log('updatePanel_Setting - data:', data);
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
             * Delete Single Panel_Setting by Panel_Setting ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            delete: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.delete('/api/panel_setting/' + id).
                success(function(data) {
                    console.log('Panel_Setting findByID:', data);
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
