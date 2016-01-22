'use strict';

angular.module('tdpApp')
  .directive('dtRadiologyOrders', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/radiologyOrders/radiologyOrders.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {

        $scope.radiologyOrders = null;

        $scope.radiologyOrdersLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);


        $scope.radiologyOrdersGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/radiologyOrders/radiologyOrdersExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.radiologyOrdersGridOptions.columnDefs = [
          { name: 'start', displayName: 'Date' , width:'*' },
          { name: 'testName', displayName: 'Order' , width:'**' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        OrdersAsClassified.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - radiologyOrders:',data);
          $scope.radiologyOrdersGridOptions.data = data.radiologyOrders;
          $scope.radiologyOrdersLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.radiologyOrdersGridOptions.onRegisterApi = function(gridApi){
          $scope.radiologyOrdersGridApi = gridApi;
        };

        $scope.expandRadiologyOrdersRows = function() {
          $scope.radiologyOrdersGridApi.expandable.expandAllRows();
        };

        $scope.collapseRadiologyOrdersRows = function() {
          $scope.radiologyOrdersGridApi.expandable.collapseAllRows();
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
