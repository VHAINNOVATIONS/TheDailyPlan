'use strict';

angular.module('tdpApp')
  .directive('dtRadiologyReportsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/radiologyReports/radiologyReportsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, RadiologyReports) {
        console.log('Patient Plan - radiologyReports patient:', $scope.patient);
        RadiologyReports.getByID($scope.patient).then(function(radiologyReports) {
          console.log('Patient Plan - radiologyReports:', radiologyReports);
          $scope.radiologyReports = radiologyReports;
          $scope.radiologyReportsError = null;
        }).catch( function() {
          $scope.radiologyReportsError = 'Internal error loading radiology reports.';
        });
      }
    };
  });
