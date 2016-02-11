'use strict';

angular.module('tdpApp')
  .directive('dtHealthFactorsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/healthFactors/healthFactorsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, HealthFactors) {
        console.log('Patient Plan - healthFactors patient:', $scope.patient);
        HealthFactors.getByID($scope.patient).then(function(healthFactors) {
          console.log('Patient Plan - healthFactors:', healthFactors);
          $scope.healthFactors = healthFactors;
          $scope.healthFactorsError = null;
        }).catch( function() {
          $scope.healthFactorsError = 'Internal error loading meds.';
        });
      }
    };
  });
