'use strict';

angular.module('tdpApp')
  .directive('dtVisits', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/visits/visits.html',
      scope: {
        patient: '=',
        panelid: '='
      },
      controller: function ($scope, Visits, Panel_Detail) {
        console.log('Patient Plan Print - visits patient:', $scope.patient);
        console.log('Patient Plan Print - visits panelid:', $scope.panelid);

        $scope.visits = null;

        $scope.visitsLoading = true;
        $scope.visitsLoadError = null;

        $scope.visitsGridOptions = {};

        $scope.visitsGridOptions.columnDefs = [
          { name: 'time', displayName: 'Date' , width:'*' },
          { name: 'clinic', displayName: 'Clinic' , width:'*' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        Visits.get($scope.patient, $scope.panelid)
        .then( function(data) {
            console.log('Patient Plan - visits:',data);
            $scope.visitsGridOptions.data = data;
            $scope.visitsLoading = false;
        })
        .catch( function(err) {
          $scope.visitsLoading = false;
          $scope.visitsLoadError = 'Internal error loading visits: ' + err.message;
        });
     }
    };
  });
