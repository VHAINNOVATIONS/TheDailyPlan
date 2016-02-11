'use strict';

angular.module('tdpApp')
  .directive('dtHealthFactors', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/healthFactors/healthFactors.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, HealthFactors, uiGridConstants) {

        $scope.healthFactors = null;

        $scope.healthFactorsLoading = true;

        $scope.healthFactorsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/healthFactors/healthFactorsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.healthFactorsGridOptions.minRowsToShow = 3;

        $scope.healthFactorsGridOptions.columnDefs = [
          { name: 'name', displayName: 'Name', width:'*' },
          { name: 'severity', displayName: 'Severity', width:'*' }
        ];

        HealthFactors.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - healthFactors:',data);
          $scope.healthFactorsGridOptions.data = data;
          $scope.healthFactorsLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.healthFactorsGridOptions.onRegisterApi = function(gridApi){
          $scope.healthFactorsGridApi = gridApi;
        };

        $scope.expandHealthFactorsRows = function() {
          $scope.healthFactorsGridApi.expandable.expandAllRows();
        };

        $scope.collapseHealthFactorsRows = function() {
          $scope.healthFactorsGridApi.expandable.collapseAllRows();
        };

      }
    };
  });
