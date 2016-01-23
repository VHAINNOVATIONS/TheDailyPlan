'use strict';

angular.module('tdpApp')
  .directive('dtImmunizationsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/immunizations/immunizationsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Immunizations) {
        console.log('Patient Plan - immunizations patient:', $scope.patient);
        Immunizations.getByID($scope.patient).then(function(immunizations) {
          console.log('Patient Plan - immunizations:', immunizations);
          $scope.immunizations = immunizations;
          $scope.immunizationsError = null;
        }).catch( function() {
          $scope.immunizationsError = 'Internal error loading immunizations.';
        });
      }
    };
  });
