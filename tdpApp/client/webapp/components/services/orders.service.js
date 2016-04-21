'use strict';

angular.module('tdpApp')
    .factory('Orders', function Orders($http) {
        return {
            get: function(patientId, topType, columnDefs, params) {
                if (! params) {
                    params = {};
                }
                params.patientId = patientId;
                var httpParams = {
                    url: '/api/orders',
                    method: 'GET',
                    params: params
                };
                return $http(httpParams).then(function(response) {
                    var result = response.data;
                    if (result) {
                        result = result[topType];
                    }
                    if (!result) {
                        result = [];
                    }

                    result.columns = columnDefs;

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

angular.module('tdpApp')
    .factory('LabOrders', function LabOrders(Orders) {
        return {
            columnDefs: [{
                name: 'start',
                displayName: 'Date/Time',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'testName',
                displayName: 'Order',
                width: '***',
                btsrpWidth: '9'
            }],
            loadingMsg: 'Loading Lab orders...',
            emptyMsg: 'No Lab Orders Found',

            get: function(patientId) {
                return Orders.get(patientId, 'labOrders', this.columnDefs);
            }
        };
    });

angular.module('tdpApp')
    .factory('RadiologyOrders', function LabOrders(Orders) {
        return {
            columnDefs: [{
                name: 'start',
                displayName: 'Date/Time',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'testName',
                displayName: 'Order',
                width: '***',
                btsrpWidth: '9'
            }],
            loadingMsg: 'Loading Radiology orders...',
            emptyMsg: 'No Radiology Orders Found',

            get: function(patientId) {
                return Orders.get(patientId, 'radiologyOrders', this.columnDefs);
            }
        };
    });

angular.module('tdpApp')
    .factory('DietOrders', function LabOrders(Orders) {
        return {
            columnDefs: [{
                name: 'start',
                displayName: 'Date/Time',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'description',
                displayName: 'Order',
                width: '**',
                btsrpWidth: '9'
            }],
            loadingMsg: 'Loading current diet order...',
            emptyMsg: 'No current diet found',

            get: function(patientId) {
                return Orders.get(patientId, 'currentDietProfile', this.columnDefs);
            }
        };
    });

angular.module('tdpApp')
    .factory('Procedures', function Procedures(Orders) {
        return {
            columnDefs: [{
                name: 'start',
                displayName: 'Date/Time',
                width: '*',
                btsrpWidth: '3'
            }, {
                name: 'name',
                displayName: 'Order',
                width: '**',
                btsrpWidth: '9'
            }],
            loadingMsg: 'Loading pending procedures...',
            emptyMsg: 'No pending procedures',

            get: function(patientId, panelDetails) {
                var futureDays = 30;
                panelDetails.forEach(function(pd) {
                    if (pd.setting_name === 'Future Days') {
                        futureDays = pd.detail_value || pd.setting_value || 30;
                    }
                });
                return Orders.get(patientId, 'procedures', this.columnDefs, {
                    futureDays: futureDays
                });
            }
        };
    });
