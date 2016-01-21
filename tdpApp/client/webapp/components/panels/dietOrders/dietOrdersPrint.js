'use strict';

angular.module('tdpApp')
  .directive('dtDietOrdersPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/dietOrders/dietOrdersPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {
        console.log('Patient Plan - dietOrders patient:', $scope.patient);
        OrdersAsClassified.getByID($scope.patient).then(function(orders) {
          console.log('Patient Plan - dietOrders:', orders.currentDietProfile);
          $scope.dietOrders = orders.currentDietProfile;
          $scope.dietOrdersError = null;
        }).catch( function() {
          $scope.dietOrdersError = 'Internal error loading meds.';
        });
      }
    };
  });
