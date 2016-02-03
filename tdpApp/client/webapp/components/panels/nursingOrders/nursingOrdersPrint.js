'use strict';

angular.module('tdpApp')
  .directive('dtNursingOrdersPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/nursingOrders/nursingOrdersPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {
        console.log('Patient Plan - nursingOrders patient:', $scope.patient);
        OrdersAsClassified.getByID($scope.patient).then(function(orders) {
          console.log('Patient Plan - nursingOrders:', orders.nursingOrders);
          $scope.nursingOrders = orders.nursingOrders;
          $scope.nursingOrdersError = null;
        }).catch( function() {
          $scope.nursingOrdersError = 'Internal error loading nursing orders.';
        });
      }
    };
  });
