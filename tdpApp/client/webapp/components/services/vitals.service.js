'use strict';

angular.module('tdpApp')
    .factory('Vitals', function Vitals($location, $rootScope, $http, $q) {
        var results = {};

        return {

            /**
             * Get Vitals
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            getByID: function(value, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/vitals/' + value).
                success(function(data) {
                    console.log('Vitals:', data);
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        data[i].subGridOptions = {
                            columnDefs: [{
                                name: "Weight",
                                field: "value"
                            }, {
                                name: "Unit",
                                field: "unit"
                            }],
                            data: (!angular.isUndefined(data[i].weight) ? [data[i].weight] : [])
                        };
                        data[i].getTemp = function() {
                            return !angular.isUndefined(this.temperature) ? this.temperature.value + ' ' + this.temperature.unit : '';
                        };
                    }
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
