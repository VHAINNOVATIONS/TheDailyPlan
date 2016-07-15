'use strict';

angular.module('tdpApp')
    .factory('Vitals', function Vitals($http) {
         return {
            columnDefs: [
                            {   name: 'dateTime', 
                                displayName: 'Date' , 
                                width:'*',
                                cellTemplate: '<div class="ui-grid-cell-contents wrap" white-space: normal>{{COL_FIELD CUSTOM_FILTERS}}</div>' 
                            },
                            { 
                                name: 'temperature.value', 
                                displayName: 'Temp' , 
                                width:'*' 
                            },
                            { 
                                name: 'bloodPressure.value', 
                                displayName: 'BP', 
                                width:'*' 
                            },
                            { 
                                name: 'pulse.value', 
                                displayName: 'Pulse', 
                                width:'*' 
                            },
                            { 
                                name: 'weight.value', 
                                displayName: 'Weight', 
                                width:'*' 
                            },
                            { 
                                name: 'respiration.value', 
                                displayName: 'Respiration', 
                                width:'*' 
                            },
                            { 
                                name: 'pain.value', 
                                displayName: 'Pain', 
                                width:'*' 
                            }
                        ],
            loadingMsg: 'Loading Vitals...',
            emptyMsg: 'No Vitals found.',
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
                    return data;
               });
            }
        };
    });
