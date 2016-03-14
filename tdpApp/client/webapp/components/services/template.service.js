'use strict';

angular.module('tdpApp')
    .factory('Template', function Template($location, $rootScope, $http, $q, Facility) {
        var results = {};
        var selectedTemplates = [];

        return {
            getSelectedPatients: function() {
                return selectedTemplates;
            },
            setSelectedPatients: function(value) {
                selectedTemplates = value;
            },

            /**
             * Find All Templates
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAll: function() {
                var id = Facility.getCurrentFacility();
                if (id) {
                  return $http.get('/api/template/facility/' + id).then(function(response) {
                      var results = response.data;
                      return results;
                  });
                } else {
                    return $q.reject('No facility is chosen.');
                }
            },

            /**
             * Find Single Template by Template ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findByID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/template/' + id).
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
             * Find Complete Template by Template ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findCompleteByID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/template/complete/' + id).
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
             * Create a New Template
             *
             * @param  {Object}   template object - query template
             *   {
             *      template_name: 'Surgery 3rd Floor East',
             *      template_description: 'The template for post-op',
             *      location_id: '4',
             *      active: 'true',
             *      template_owner: 'smithj'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            create: function(template) {
                var id = Facility.getCurrentFacility();
                if (id) {
                    template.facility_id = id;
                    return $http.post('/api/template/', template);
                } else {
                    return $q.reject('No facility is chosen.');
                }
            },

            /**
             * Update a Template
             *
             * @param  {Object}   template object - query template
             *   {
             *      template_name: 'Surgery 3rd Floor East',
             *      template_description: 'The template for post-op',
             *      location_id: '4',
             *      active: 'true',
             *      template_owner: 'smithj'
             *   }
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            update: function(template) {
                var id = Facility.getCurrentFacility();
                if (id) {
                    template.facility_id = id;
                    return $http.post('/api/template/' + template.id, template);
                } else {
                    return $q.reject('No facility is chosen.');
                }
            },

            /**
             * Delete Single Template by Template ID
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            delete: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.delete('/api/template/' + id).
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
            }

        };
    });
