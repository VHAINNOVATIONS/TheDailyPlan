'use strict';

angular.module('tdpApp')
  .directive('dtPendingProceduresPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/pendingProcedures/pendingProceduresPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, OrdersAsClassified) {
        console.log('Patient Plan - pendingProcedures patient:', $scope.patient);
        OrdersAsClassified.getByID($scope.patient).then(function(orders) {
          console.log('Patient Plan - pendingProcedures:', orders.procedures);
          $scope.pendingProcedures = orders.procedures;
          $scope.pendingProceduresError = null;
        }).catch( function() {
          $scope.pendingProceduresError = 'Internal error loading pending procedures.';
        });
      }
    };
  });
