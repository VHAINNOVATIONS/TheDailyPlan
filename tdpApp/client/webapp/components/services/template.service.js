'use strict';

angular.module('tdpApp')
    .factory('Template', function Template($location, $rootScope, $http, $q, Facility, Location) {

        var tabInfo = null;
        var templates = null;
        var uiSettings = null;
        var pageInfo = null;

        var resetData = function() {
            tabInfo = [{
                active: true
            }, {
                active: false
            }, {
                active: false
            }];
            templates = null;
            uiSettings = {
                load: {
                    type: null
                }
            };
            pageInfo = {
                page: 0,
                length: 10
            };
        };

        resetData();

        $rootScope.$on('login-success', resetData);

        var putLocationName = function(results, locations) {
            var dictionary = locations.reduce(function(r, location) {
                r[location.id] = location.name;
                return r;
            }, {});
            results.forEach(function(t) {
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
            return results;
        };

        var putSingleLocationName = function(template, locations) {
            var locationId = template.location_id;
            if (locationId) {
                if (typeof locationId === 'number') {
                    locationId = locationId.toString();
                }
                var location = _.find(locations, {
                    'id': locationId
                });
                var locationName = location && location.name;
                if (locationName) {
                    template.locationName = locationName;
                } else {
                    template.locationName = locationId;
                }
            }
        };

        var shouldBeLoaded = function(template) {
            var type = uiSettings.load.type;
            if (type !== null) {
                var param = uiSettings.load.param;
                if ((type === 1) || (type === 2)) {
                    if (typeof param === 'string') {
                        param = parseInt(param, 10);
                    }
                    return (template.location_type === type) && (template.location_id === param);
                }
                if (param && param.length) {
                    var n = param.length;
                    param = param.toLowerCase();
                    var name = template.template_name;
                    name = name && name.slice(0, n).toLowerCase();
                    return name === param;
                }
                return true;
            }
            return false;
        };

        return {
            /**
             * Find All Templates
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findAll: function(input, cache) {
                var id = Facility.getCurrentFacility();
                if (id) {
                    return $http.get('/api/template/facility/' + id).then(function(response) {
                        var results = response.data;
                        return results;
                    }).then(function(results) {
                        if (input && input.length) {
                            var n = input.length;
                            input = input.toLowerCase();
                            results = results.reduce(function(r, t) {
                                var name = t.template_name;
                                name = name && name.slice(0, n).toLowerCase();
                                if (name === input) {
                                  r.push(t);
                                }
                                return r;
                            }, []);
                        }
                        return results;
                    }).then(function(results) {
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
                                results.forEach(function(t) {
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
                                if (cache) {
                                    templates = results;
                                }
                                return results;
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
                    }).then(function(results) {
                        return Location.getWards().then(function(wards) {
                            templates = putLocationName(results, wards);
                            return templates;
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
                    }).then(function(results) {
                        return Location.getClinics().then(function(clinics) {
                            templates = putLocationName(results, clinics);
                            return templates;
                        });
                    });
                } else {
                    return $q.reject('No facility is chosen.');
                }
            },

            foundTemplates: function() {
                return templates;
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
                    return $http.post('/api/template/', template).then(function(result) {
                        var id = result && result.data && result.data.id;
                        if (id && shouldBeLoaded(template)) {
                            var locationType = template.location_type;
                            var newTemplate = {
                                id: id,
                                template_name: template.template_name,
                                template_description: template.template_description || null,
                                template_owner: template.template_owner,
                                facility_id: template.facility_id,
                                location_id: template.location_id,
                                location_type: template.location_type,
                                locationName: null,
                                active: true
                            };
                            templates.push(newTemplate);
                            if (locationType === 1) {
                                return Location.getWards().then(function(wards) {
                                    putSingleLocationName(newTemplate, wards);
                                    return result;
                                });
                            } else if (locationType === 2) {
                                return Location.getClinics().then(function(clinics) {
                                    putSingleLocationName(newTemplate, clinics);
                                    return result;
                                });
                            }
                            return result;
                        }
                    });
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
                    return $http.put('/api/template/' + template.id, template).then(function(result) {
                        if (templates) {
                            var tid = template.id;
                            if (typeof tid === 'string') {
                                tid = parseInt(tid, 10);
                            }
                            var existing = _.find(templates, {
                                'id': tid
                            });
                            if (existing) {
                                existing.template_name = template.template_name;
                                existing.template_description = template.template_description;
                                existing.template_owner = template.template_owner;
                                existing.facility_id = template.facility_id;
                                existing.location_id = template.location_id;
                                var locationType = template.location_type;
                                existing.location_type = template.location_type;
                                existing.locationName = null;
                                if (locationType === 1) {
                                    return Location.getWards().then(function(wards) {
                                        putSingleLocationName(existing, wards);
                                        return result;
                                    });
                                } else if (locationType === 2) {
                                    return Location.getClinics().then(function(clinics) {
                                        putSingleLocationName(existing, clinics);
                                        return result;
                                    });
                                }
                            }
                            return result;
                        }
                    });
                } else {
                    return $q.reject('No facility is chosen.');
                }
            },

            /**
             * Delete Single Template by Template ID
             *
             * @param  {String}   id    - query id
             * @return {Promise}
             */
            delete: function(id) {
                return $http.delete('/api/template/' + id).then(function() {
                    if (templates) {
                        _.remove(templates, function(template) {
                            return template.id === id;
                        });
                        var n = templates.length;
                        if ((pageInfo.page > 0) && (n % pageInfo.length === 0)) {
                            var total = pageInfo.length * (pageInfo.page + 1);
                            if (total > n) {
                                pageInfo.page = pageInfo.page - 1;
                            }
                        }
                    }
                });
            },

            tabInfo: function () {
                return tabInfo;
            },
            uiSettings: function () {
                return uiSettings;
            },
            pageInfo: function() {
                return pageInfo;
            }

        };
    });
