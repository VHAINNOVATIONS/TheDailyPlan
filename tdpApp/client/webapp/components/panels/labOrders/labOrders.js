'use strict';

angular.module('tdpApp')
  .directive('dtLabOrders', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/labOrders/labOrders.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Orders) {

        $scope.labOrders = null;

        $scope.labOrdersLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);


        $scope.labOrdersGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/labOrders/labOrdersExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.labOrdersGridOptions.columnDefs = [
          { name: 'start', displayName: 'Date' , width:'*' },
          { name: 'testName', displayName: 'Order' , width:'**' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        Orders.get($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - labOrders:',data);
          $scope.labOrdersGridOptions.data = data.labOrders;
          $scope.labOrdersLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.labOrdersGridOptions.onRegisterApi = function(gridApi){
          $scope.labOrdersGridApi = gridApi;
        };

        $scope.expandLabOrdersRows = function() {
          $scope.labOrdersGridApi.expandable.expandAllRows();
        };

        $scope.collapseLabOrdersRows = function() {
          $scope.labOrdersGridApi.expandable.collapseAllRows();
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
