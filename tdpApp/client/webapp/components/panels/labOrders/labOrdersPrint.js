'use strict';

angular.module('tdpApp')
  .directive('dtLabOrdersPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/labOrders/labOrdersPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {
        console.log('Patient Plan - labOrders patient:', $scope.patient);
        OrdersAsClassified.getByID($scope.patient).then(function(orders) {
          console.log('Patient Plan - labOrders:', orders.labOrders);
          $scope.labOrders = orders.labOrders;
          $scope.labOrdersError = null;
        }).catch( function() {
          $scope.labOrdersError = 'Internal error loading lab orders.';
        });
      }
    };
  });
