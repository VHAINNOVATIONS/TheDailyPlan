'use strict';

angular.module('tdpApp')
    .directive('dtSimpleGridPrint', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'components/panels/simpleGrid/simpleGridPrint.html',
            scope: {
                patient: '=',
                service: '@service',
                paneldetail: '='
            },
            controller: function($scope, $injector) {
                console.log($scope.service + ' Print - patient:', $scope.patient);
                console.log($scope.service + ' Print - panelid:', $scope.panelid);

                var service = $injector.get($scope.service);
                service.get($scope.patient, $scope.paneldetail)
                    .then(function(visits) {
                        console.log($scope.service + ': ', visits);
                        $scope.dataRows = visits;
                        $scope.loadError = null;
                        $scope.emptyMsg = service.emptyMsg;
                        $scope.columnDefs = service.columnDefs;
                    })
                    .catch(function(err) {
                        $scope.loadError = 'Internal error: ' + err.message;
                    });
            }
        };
    });
