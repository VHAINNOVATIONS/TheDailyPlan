'use strict';

angular.module('tdpApp')
  .directive('dtImmunizations', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/immunizations/immunizations.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Immunizations) {

        $scope.immunizations = null;
        Immunizations.getByEIN($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - immunizations:',data);
          $scope.immunizations = data;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };
  });
