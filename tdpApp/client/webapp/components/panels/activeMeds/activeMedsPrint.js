'use strict';

angular.module('tdpApp')
  .directive('dtActiveMedsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/activeMeds/activeMedsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Medication) {
        console.log('Patient Plan Print - activeMeds patient:', $scope.patient);
        Medication.getActiveInpatientMeds($scope.patient).then(function(activeMeds) {
          console.log('Patient Plan Print - activeMeds:', activeMeds);
          $scope.activeMeds = activeMeds;
          $scope.activeMedsLoadError = null;
        }).catch( function() {
          $scope.activeMedsLoadError = 'Internal error loading inpatient meds.';
        });
      }
    };
  });
