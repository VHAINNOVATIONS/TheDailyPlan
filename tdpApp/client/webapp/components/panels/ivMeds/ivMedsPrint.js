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
        console.log('Patient Plan - ivMeds patient:', $scope.patient);
        Medication.getIvMeds($scope.patient).then(function(ivMeds) {
          console.log('Patient Plan - ivMeds:', ivMeds);
          $scope.ivMeds = ivMeds;
          $scope.ivMedsError = null;
        }).catch( function() {
          $scope.ivMedsError = 'Internal error loading meds.';
        });
      }
    };
  });
