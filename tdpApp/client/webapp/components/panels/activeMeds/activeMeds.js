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
      controller: function ($scope, Medication) {

        $scope.activeMeds = null;

        $scope.activeMedsLoading = true;
        $scope.activeMedsLoadError = null;

        $scope.activeMedsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/activeMeds/activeMedsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.activeMedsGridOptions.columnDefs = [
          { name: 'detail', displayName: 'Drug', width:'**' },
          { name: 'route', displayName: 'Route', width:'*' }
        ];

        Medication.getActiveMeds($scope.patient).then( function(data) {
          console.log('Patient Plan - activeMeds:', data);
          $scope.activeMedsGridOptions.data = data;
          $scope.activeMedsLoading = false;
        }).catch( function() {
          $scope.activeMedsLoading = false;
          $scope.activeMedsLoadError = 'Internal error loading meds.';
        });

        $scope.activeMedsGridOptions.onRegisterApi = function(gridApi){
          $scope.activeMedsGridApi = gridApi;
        };

        $scope.expandActiveMedsRows = function() {
          $scope.activeMedsGridApi.expandable.expandAllRows();
        };

        $scope.collapseActiveMedsRows = function() {
          $scope.activeMedsGridApi.expandable.collapseAllRows();
        };
      }
    };
  });
