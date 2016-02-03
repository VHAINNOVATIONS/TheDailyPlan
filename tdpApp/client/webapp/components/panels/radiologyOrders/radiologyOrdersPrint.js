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
      controller: function ($scope, radiologyOrders) {
        console.log('Patient Plan - radiologyOrders patient:', $scope.patient);
        RadiologyOrders.getByID($scope.patient).then(function(radiologyOrders) {
           OrdersAsClassified.getByID($scope.patient).then(function(orders) {
		   console.log('Patient Plan - radiologyOrders:', orders.radiologyOrders);
		   $scope.radiologyOrders = orders.radiologyOrders;
          $scope.radiologyOrders = null;
        }).catch( function() {
          $scope.radiologyOrdersError = 'Internal error loading radiology orders.';
        });
      }
    };
  });
