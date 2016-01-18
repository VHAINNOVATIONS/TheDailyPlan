'use strict';

angular.module('tdpApp')
  .directive('dtIvMeds', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/ivMeds/ivMeds.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Medication) {

        $scope.ivMeds = null;

        $scope.ivMedsLoading = true;
        $scope.ivMedsLoadError = null;

        $scope.ivMedsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/ivMeds/ivMedsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.ivMedsGridOptions.columnDefs = [
          { name: 'detail', displayName: 'Drug', width:'**' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        Medication.getIvMeds($scope.patient).then( function(data) {
          console.log('Patient Plan - ivMeds:', data);
          $scope.ivMedsGridOptions.data = data;
          $scope.ivMedsLoading = false;
        }).catch( function() {
          $scope.ivMedsLoading = false;
          $scope.ivMedsLoadError = 'Internal error loading meds.';
        });

        $scope.ivMedsGridOptions.onRegisterApi = function(gridApi){
          $scope.ivMedsGridApi = gridApi;
        };

        $scope.expandIVMedsRows = function() {
          $scope.ivMedsGridApi.expandable.expandAllRows();
        };

        $scope.collapseIVMedsRows = function() {
          $scope.ivMedsGridApi.expandable.collapseAllRows();
        };
      }
    };
  });
