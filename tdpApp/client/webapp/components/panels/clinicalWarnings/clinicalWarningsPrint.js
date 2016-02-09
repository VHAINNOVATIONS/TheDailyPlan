'use strict';

angular.module('tdpApp')
  .directive('dtClinicalWarningPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/clinicalWarning/clinicalWarningPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, ClinicalWarning) {
        console.log('Patient Plan - clinicalWarning patient:', $scope.patient);
        ClinicalWarning.getByID($scope.patient).then(function(clinicalWarning) {
          console.log('Patient Plan - clinicalWarning:', clinicalWarning);
          $scope.clinicalWarning = clinicalWarning;
          $scope.clinicalWarningError = null;
        }).catch( function() {
          $scope.clinicalWarningError = 'Internal error loading meds.';
        });
      }
    };
  });
