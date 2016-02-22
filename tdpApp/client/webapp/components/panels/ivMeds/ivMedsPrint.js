'use strict';

angular.module('tdpApp')
  .directive('dtIvMedsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/ivMeds/ivMedsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Medication) {
        console.log('Patient Plan Print - ivMeds patient:', $scope.patient);
        Medication.getIvMeds($scope.patient).then(function(ivMeds) {
          console.log('Patient Plan Print- ivMeds:', ivMeds);
          $scope.ivMeds = ivMeds;
          $scope.ivMedsLoadError = null;
        }).catch( function() {
          $scope.ivMedsLoadError = 'Internal error loading meds.';
        });
      }
    };
  });
