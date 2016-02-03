'use strict';

angular.module('tdpApp')
  .directive('dtLabsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/labs/labsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Labs) {
        console.log('Patient Plan - labs patient:', $scope.patient);
        Labs.getByID($scope.patient).then(function(labs) {
          console.log('Patient Plan - labs:', labs);
          $scope.labs = labs;
          $scope.labsError = null;
        }).catch( function() {
          $scope.labsError = 'Internal error loading labs.';
        });
      }
    };
  });
