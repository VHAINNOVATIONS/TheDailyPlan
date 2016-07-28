'use strict';

angular.module('tdpApp')
    .factory('Template', function Template($location, $rootScope, $http, $q, Facility, Location) {

        var tabInfo = null;

        var resetData = function() {
            tabInfo = [{
                active: true
            }, {
                active: false
            }, {
                active: false
            }];
        };

        resetData();

        $rootScope.$on('login-success', resetData);

        var putLocationName = function(templates, locations) {
            var dictionary = locations.reduce(function(r, location) {
                r[location.id] = location.name;
                return r;
            }, {});
            templates.forEach(function(t) {
                if (t.location_id) {
                    var locationName = dictionary[t.location_id];
                    if (locationName) {
                        t.locationName = locationName;
                    } else {
                        t.locationName = t.location_id;
                    }
                } else {
                  t.locationName = null;
                }
            });
            return templates;
        };

        return {
            /**
             * Find All Templates
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAll: function(input) {
                var id = Facility.getCurrentFacility();
                if (id) {
                    return $http.get('/api/template/facility/' + id).then(function(response) {
                        var results = response.data;
                        return results;
                    }).then(function(templates) {
                        if (input && input.length) {
                            var n = input.length;
                            input = input.toLowerCase();
                            templates = templates.reduce(function(r, t) {
                                var name = t.template_name;
                                name = name && name.slice(0, n).toLowerCase();
                                if (name === input) {
                                  r.push(t);
                                }
                                return r;
                            }, []);
                        }
                        return templates;
                    }).then(function(templates) {
                        return Location.getWards().then(function(wards) {
                            return Location.getClinics().then(function(clinics) {
                                var wardsDictionary = wards.reduce(function(r, ward) {
                                    r[ward.id] = ward.name;
                                    return r;
                                }, {});
                                var clinicsDictionary = clinics.reduce(function(r, clinic) {
                                    r[clinic.id] = clinic.name;
                                    return r;
                                }, {});
                                templates.forEach(function(t) {
                                    if (t.location_id) {
                                        var locationName = t.location_type === 2 ? clinicsDictionary[t.location_id] : wardsDictionary[t.location_id];
                                        if (locationName) {
                                            t.locationName = locationName;
                                        } else {
                                            t.locationName = t.location_id;
                                        }
                                    } else {
                                      t.locationName = null;
                                    }
                                });
                                return templates;
                            });
                        });
                    });
                } else {
                    return $q.reject('No facility is chosen.');
                }
            },

            findByWard: function(wardId) {
                var id = Facility.getCurrentFacility();
                if (id) {
                    return $http.get('/api/template/ward/' + id + '/' + wardId).then(function(response) {
                        var results = response.data;
                        return results;
                    }).then(function(templates) {
                        return Location.getWards().then(function(wards) {
                            return putLocationName(templates, wards);
                        });
                    });
                } else {
                    return $q.reject('No facility is chosen.');
                }
            },

            findByClinic: function(clinicId) {
                var id = Facility.getCurrentFacility();
                if (id) {
                    return $http.get('/api/template/clinic/' + id + '/' + clinicId).then(function(response) {
                        var results = response.data;
                        return results;
                    }).then(function(templates) {
                        return Location.getClinics().then(function(clinics) {
                            return putLocationName(templates, clinics);
                        });
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
                    return $http.put('/api/template/' + template.id, template);
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
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {

                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },

            tabInfo: function () {
                return tabInfo;
            }
        };
    });
