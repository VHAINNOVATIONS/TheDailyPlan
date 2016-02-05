'use strict';

angular.module('tdpApp')
  .directive('dtPendingProcedures', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/pendingProcedures/pendingProcedures.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {

        $scope.pendingProcedures = null;

        $scope.pendingProceduresLoading = true;
        console.log('Patient Plan - pendingProcedures:',$scope.patient);


        $scope.pendingProceduresGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/pendingProcedures/pendingProceduresExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.pendingProceduresGridOptions.columnDefs = [
          { name: 'start', displayName: 'Date' , width:'*' },
          { name: 'testName', displayName: 'Order' , width:'**' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        OrdersAsClassified.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - pendingProcedures:',data);
          $scope.pendingProceduresGridOptions.data = data.procedures;
          $scope.pendingProceduresLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.pendingProceduresGridOptions.onRegisterApi = function(gridApi){
          $scope.pendingProceduresGridApi = gridApi;
        };

        $scope.expandPendingProceduresRows = function() {
          $scope.pendingProceduresGridApi.expandable.expandAllRows();
        };

        $scope.collapsePendingProceduresRows = function() {
          $scope.pendingProceduresGridApi.expandable.collapseAllRows();
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
