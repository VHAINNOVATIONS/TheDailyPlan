'use strict';

angular.module('tdpApp')
    .factory('Labs', function Labs($http) {
        return {
            columnDefs: [{
                name: 'date',
                displayName: 'Date',
                width: '*',
                btsrpWidth: '2'
            }, {
                name: 'name',
                displayName: 'Name',
                width: '**',
                btsrpWidth: '4'
            }, {
                name: 'value',
                displayName: 'Value',
                width: '*',
                btsrpWidth: '2'
            }, {
                name: 'units',
                displayName: 'Units',
                width: '*',
                btsrpWidth: '2'
            }, {
                name: 'refRange',
                displayName: 'Range',
                width: '*',
                btsrpWidth: '2'
            }],
            loadingMsg: 'Loading lab results...',
            emptyMsg: 'No lab results found',

            /**
             * Get Visits
             *
             * @param  {String}   patientId    - query patientId
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            get: function(patientId, panelDetails) {
                var self = this;
                var tn = [];
                var occurances = '3';
                panelDetails.forEach(function(pd) {
                    if (pd.setting_name === 'Occurences') {
                        occurances = pd.detail_value || '3';
                        return;
                    }
                    if (pd.setting_name === 'Test Names') {
                        if (pd.detail_value) {
                          tn.push(pd.detail_value);
                        }
                    }
                });
                var params = {
                    patientId: patientId,
                    occurances: occurances
                };
                if (tn.length) {
                    params.testNames = tn;
                }
                var httpParams = {
                    url: '/api/labs',
                    method: 'GET',
                    params: params
                };
                return $http(httpParams).then(function(response) {
                    var result = response.data;
                    result.columns = self.columnDefs;

                    result.forEach(function(row) {
                        row.columns = result.columns.map(function(p) {
                            return {
                                btsrpWidth: p.btsrpWidth,
                                value: row[p.name]
                            };
                        });
                    });
                    return result;
                });
            }
        };
    });



//angular.module('tdpApp')
//    .factory('Labs', function Labs($location, $rootScope, $http, $q, $filter) {
//        var results = {};
//        var labTestNames = [];
//        var defaultTestNames = ['MAGNESIUM', 'POTASSIUM', 'HDL', 'TRIGLYCERIDE', 'CHOLESTEROL', 'CREATININE', 'HEMOGLOBIN A1C', 'LDL CHOLESTEROL'];
//
//        return {
//
//            /**
//             * Get Labs
//             *
//             * @param  {String}   value    - query value
//             * @param  {Function} callback - optional
//             * @return {Promise}
//             */
//
//            getByID: function(value, callback) {
//                var cb = callback || angular.noop;
//                var deferred = $q.defer();
//
//                var parameters = {};
//                var config = {};
//                parameters.testNames = labTestNames.length > 0 ? labTestNames : defaultTestNames;
//                console.log('Test Names: %s', parameters.testNames);
//                config.params = parameters;
//
//                $http.get('/api/labs/' + value, config).
//                success(function(data) {
//                    console.log('AFSIN %s', data.length);
//                    deferred.resolve(data);
//                    return cb();
//                }).
//                error(function(err) {
//
//                    deferred.reject(err);
//                    return cb(err);
//                }.bind(this));
//
//                return deferred.promise;
//            },
//
//            /**
//             * Search Patients By Clinic
//             *
//             * @param  {String}   value    - query value
//             * @param  {Function} callback - optional
//             * @return {Promise}
//             */
//            byName: function(value, callback) {
//                var cb = callback || angular.noop;
//                var deferred = $q.defer();
//
//                $http.get('/api/labs/byName/' + value).
//                success(function(data) {
//                    results = data;
//                    deferred.resolve(data);
//                    return cb();
//                }).
//                error(function(err) {
//
//                    deferred.reject(err);
//                    return cb(err);
//                }.bind(this));
//
//                return deferred.promise;
//            },
//            /**
//             * Panel Details - Get and Set
//             */
//            getLabTestNames: function() {
//                return labTestNames;
//            },
//            setLabTestNames: function(value) {
//                labTestNames = value;
//            },
//        };
//    });
