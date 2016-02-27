'use strict';

angular.module('tdpApp')
  .directive('dtOutpatientMedsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/outpatientMeds/outpatientMedsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Medication) {
        console.log('Patient Plan Print - outpatientMeds patient:', $scope.patient);
        Medication.getOutpatientMeds($scope.patient).then(function(outpatientMeds) {
          console.log('Patient Plan Print - outpatientMeds:', outpatientMeds);
          $scope.outpatientMeds = outpatientMeds;
          $scope.outpatientMedsLoadError = null;
        }).catch( function() {
          $scope.outpatientMedsLoadError = 'Internal Error Loading Outpatient Meds';
        });
      }
    };
  });
