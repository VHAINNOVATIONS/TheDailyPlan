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
        console.log('Patient Plan Print - allergies patient:', $scope.patient);
        Allergy.getByID($scope.patient).then(function(allergies) {
          console.log('Patient Plan Print - allergies:', allergies);
          if (allergies.status) {
            $scope.allergies = allergies.allergies;
            $scope.allergiesMessage = null;
          } else {
            $scope.allergies = [];
            $scope.allergiesMessage =(allergies.status === null) ? 'No Allergy Assessment' : 'No Known Allergies';
          }
          $scope.allergiesError = null;
        }).catch( function() {
          $scope.allergiesError = 'Internal Error Loading Allergies';
        });
      }
    };
  });
