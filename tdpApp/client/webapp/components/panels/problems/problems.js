'use strict';

angular.module('tdpApp')
  .directive('dtProblems', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/problems/problems.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Problems) {

        $scope.problems = null;

        $scope.problemsLoading = true;

        $scope.problemsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/problems/problemsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.problemsGridOptions.columnDefs = [
          { name: 'facility.name', displayName: 'Facility', width:'*' },
          { name: 'status', displayName: 'Status', width:'*' },
          { name: 'onsetDate', displayName: 'Date Onset', width:'*' },
          { name: 'code', displayName: 'Code', width:'*' },
          { name: 'description', displayName: 'Description', width:'*' }
        ];

        Problems.getByEIN($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - problems:',data);
          $scope.problemsGridOptions.data = data;
          $scope.problemsLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.problemsGridOptions.onRegisterApi = function(gridApi){
          $scope.problemsGridApi = gridApi;
        };

        $scope.expandProblemsRows = function() {
          $scope.problemsGridApi.expandable.expandAllRows();
        };

        $scope.collapseProblemsRows = function() {
          $scope.problemsGridApi.expandable.collapseAllRows();
        };

      }/*,
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
          }
        });
      }*/
    };
  });
