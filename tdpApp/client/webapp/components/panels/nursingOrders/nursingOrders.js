'use strict';

angular.module('tdpApp')
  .directive('dtNursingOrders', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/nursingOrders/nursingOrders.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {

        $scope.nursingOrders = null;

        $scope.nursingOrdersLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);


        $scope.nursingOrdersGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/nursingOrders/nursingOrdersExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.nursingOrdersGridOptions.columnDefs = [
          { name: 'start', displayName: 'Date' , width:'*' },
          { name: 'testName', displayName: 'Order' , width:'**' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        OrdersAsClassified.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - nursingOrders:',data);
          $scope.nursingOrdersGridOptions.data = data.nursingOrders;
          $scope.nursingOrdersLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.nursingOrdersGridOptions.onRegisterApi = function(gridApi){
          $scope.nursingOrdersGridApi = gridApi;
        };

        $scope.expandNursingOrdersRows = function() {
          $scope.nursingOrdersGridApi.expandable.expandAllRows();
        };

        $scope.collapseNursingOrdersRows = function() {
          $scope.nursingOrdersGridApi.expandable.collapseAllRows();
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
