'use strict';

angular.module('tdpApp')
  .directive('dtAllergiesPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/allergies/allergiesPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Allergy) {
        console.log('Patient Plan - allergies patient:', $scope.patient);
        Allergy.getByID($scope.patient).then(function(allergies) {
          console.log('Patient Plan - allergies:', allergies);
          $scope.allergies = allergies;
          $scope.allergiesError = null;
        }).catch( function() {
          $scope.allergiesError = 'Internal error loading meds.';
        });
      }
    };
  });
