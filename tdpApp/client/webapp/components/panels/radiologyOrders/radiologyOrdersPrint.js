'use strict';

angular.module('tdpApp')
  .directive('dtRadiologyOrdersPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/radiologyOrders/radiologyOrdersPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {
        console.log('Patient Plan - radiologyOrders patient:', $scope.patient);
        OrdersAsClassified.getByID($scope.patient).then(function(orders) {
          console.log('Patient Plan - radiologyOrders:', orders.radiologyOrders);
          $scope.radiologyOrders = orders.radiologyOrders;
          $scope.radiologyOrdersError = null;
        }).catch( function() {
          $scope.radiologyOrdersError = 'Internal error loading nursing orders.';
        });
      }
    };
  });
