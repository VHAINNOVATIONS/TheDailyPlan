'use strict';

angular.module('tdpApp')
  .directive('dtAllergies', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/allergies/allergies.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Allergy) {

        $scope.allergies = null;
        Allergy.getByEIN($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - allergies:',data);
          $scope.allergies = data;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };
  });
