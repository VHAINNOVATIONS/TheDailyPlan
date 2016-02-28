'use strict';

angular.module('tdpApp')
  .directive('dtActiveMeds', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/activeMeds/activeMeds.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, InpatientMedication) {
        $scope.activeMeds = null;

        $scope.activeMedsLoading = true;
        $scope.activeMedsLoadError = null;

        $scope.activeMedsGridOptions = {};

        $scope.activeMedsGridOptions.columnDefs = [
          { name: 'name', displayName: 'Name', width:'*'},
          { name: 'dose', displayName: 'Dose', width:'*'},
          { name: 'route', displayName: 'Route', width:'*'},
          { name: 'schedule', displayName: 'Schedule', width:'*'}
        ];
        InpatientMedication.get($scope.patient).then( function(data) {
          console.log('Patient Plan - activeMeds:', data);
          $scope.activeMedsGridOptions.data = data;
          $scope.activeMedsLoading = false;
        }).catch( function() {
          $scope.activeMedsLoading = false;
          $scope.activeMedsLoadError = 'Internal Error Loading Active Inpatient Meds';
        });

        $scope.activeMedsGridOptions.onRegisterApi = function(gridApi){
          $scope.activeMedsGridApi = gridApi;
        };
      }
    };
  });
