'use strict';

angular.module('tdpApp')
    .directive('dtSimpleGrid', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'components/panels/simpleGrid/simpleGrid.html',
            scope: {
                patient: '=',
                service: '@service',
                paneldetail: '='
            },
            controller: function($scope, $injector) {
                console.log($scope.service + '- patient:', $scope.patient);
                console.log($scope.service + '- panelid:', $scope.panelid);

                $scope.loading = true;
                $scope.loadError = null;

                var service = $injector.get($scope.service);

                $scope.gridOptions = {
                    columnDefs: service.columnDefs,
                    enablePinning: false
                };

                service.get($scope.patient, $scope.paneldetail)
                    .then(function(data) {
                        console.log($scope.service + ': ', data);
                        $scope.gridOptions.data = data;
                        $scope.loading = false;
                        $scope.loadingMsg = service.loadingMsg;
                        $scope.emptyMsg = service.emptyMsg;
                    })
                    .catch(function(err) {
                        $scope.loading = false;
                        $scope.loadError = 'Internal error: ' + err.message;
                    });
            }
        };
    });
