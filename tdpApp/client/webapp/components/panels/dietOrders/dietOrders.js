'use strict';

angular.module('tdpApp')
  .directive('dtDietOrders', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/dietOrders/dietOrders.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {

        $scope.dietOrders = null;

        $scope.dietOrdersLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);


        $scope.dietOrdersGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/dietOrders/dietOrdersExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.dietOrdersGridOptions.columnDefs = [
          { name: 'start', displayName: 'Date', width: '*' },
          { name: 'description', displayName: 'Order', width: '**'}
        ];

        OrdersAsClassified.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - dietOrders:',data);
          $scope.dietOrdersGridOptions.data = data.currentDietProfile;
          $scope.dietOrdersLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.dietOrdersGridOptions.onRegisterApi = function(gridApi){
          $scope.dietOrdersGridApi = gridApi;
        };

        $scope.expandDietOrdersRows = function() {
          $scope.dietOrdersGridApi.expandable.expandAllRows();
        };

        $scope.collapseDietOrdersRows = function() {
          $scope.dietOrdersGridApi.expandable.collapseAllRows();
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
