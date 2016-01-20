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
        console.log('Patient Plan - activeMeds:', $scope.patient);
        Medication.getActiveMeds($scope.patient).then(function(activeMeds) {
          console.log('Patient Plan - activeMeds:', activeMeds);
          $scope.activeMeds = activeMeds;
          $scope.activeMedsError = null;
        }).catch( function() {
          $scope.activeMedsError = 'Internal error loading meds.';
        });
      }
    };
  });
