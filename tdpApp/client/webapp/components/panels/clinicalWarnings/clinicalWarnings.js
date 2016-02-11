'use strict';

angular.module('tdpApp')
  .directive('dtClinicalWarnings', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/clinicalWarnings/clinicalWarnings.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, ClinicalWarnings, uiGridConstants) {

        $scope.clinicalWarnings = null;

        $scope.clinicalWarningsLoading = true;

        $scope.clinicalWarningsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/clinicalWarnings/clinicalWarningsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.clinicalWarningsGridOptions.minRowsToShow = 3;

        $scope.clinicalWarningsGridOptions.columnDefs = [
          { name: 'type', displayName: 'Type', width:'*' },
          { name: 'urgency', displayName: 'Urgency', width:'*' },
          { name: 'text[0]', displayName: 'Text', width:'**' }
        ];

        ClinicalWarnings.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - clinicalWarnings:',data);
          $scope.clinicalWarningsGridOptions.data = data;
          $scope.clinicalWarningsLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.clinicalWarningsGridOptions.onRegisterApi = function(gridApi){
          $scope.clinicalWarningsGridApi = gridApi;
        };

        $scope.expandClinicalWarningsRows = function() {
          $scope.clinicalWarningsGridApi.expandable.expandAllRows();
        };

        $scope.collapseClinicalWarningsRows = function() {
          $scope.clinicalWarningsGridApi.expandable.collapseAllRows();
        };

      }
    };
  });
