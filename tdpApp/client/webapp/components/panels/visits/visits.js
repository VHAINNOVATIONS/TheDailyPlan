'use strict';

angular.module('tdpApp')
  .directive('dtVisits', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/visits/visits.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Visits) {

        $scope.visits = null;

        $scope.visitsLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);


        $scope.visitsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/visits/visitsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.visitsGridOptions.columnDefs = [
          { name: 'time', displayName: 'Date' , width:'*' },
          { name: 'title', displayName: 'Appointment Type' , width:'*' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        Visits.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - visits:',data);
          $scope.visitsGridOptions.data = data;
          $scope.visitsLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.visitsGridOptions.onRegisterApi = function(gridApi){
          $scope.visitsGridApi = gridApi;
        };

        $scope.expandVisitsRows = function() {
          $scope.visitsGridApi.expandable.expandAllRows();
        };

        $scope.collapseVisitsRows = function() {
          $scope.visitsGridApi.expandable.collapseAllRows();
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
