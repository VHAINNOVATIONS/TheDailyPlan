'use strict';

angular.module('tdpApp')
    .factory('Vitals', function Vitals($http) {
         return {
            get: function(patientId, panelDetails) {
                var fn = function() {
                    return !angular.isUndefined(this.temperature) ? this.temperature.value + ' ' + this.temperature.unit : '';
                };
                var occurances = '3';
                var backdays = '30';
                panelDetails.forEach(function(pd) {
                    if (pd.setting_name === 'Occurences') {
                       occurances = pd.detail_value || '3';
                    }
                    if(pd.setting_name === 'Back Days'){
                        backdays = pd.detail_value || '30';
                    }
                });
                var params = {
                    occurances: occurances,
                    backdays: backdays
                };
                var httpParams = {
                    url: '/api/vitals/' + patientId,
                    method: 'GET',
                    params: params
                };
                return $http(httpParams).then(function(response) {
                    var data = response.data;
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        data[i].subGridOptions = {
                            columnDefs: [{
                                name: 'Weight',
                                field: 'value'
                            }, {
                                name: 'Unit',
                                field: 'unit'
                            }],
                            data: (!angular.isUndefined(data[i].weight) ? [data[i].weight] : [])
                        };
                        data[i].getTemp = fn;
                    }
                    return data;
               });
            }
        };
    });
