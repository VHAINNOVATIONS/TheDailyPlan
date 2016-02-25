'use strict';

angular.module('tdpApp')
  .directive('dtVisitsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/visits/visitsPrint.html',
      scope: {
        patient: '=',
        panelid: '='
      },
      controller: function ($scope, Visits, Panel_Detail) {
        console.log('Patient Plan Print - visits patient:', $scope.patient);
        console.log('Patient Plan Print - visits panelid:', $scope.panelid);
        Panel_Detail.findCompleteByID($scope.panelid)
        .then( function(panel_details) {
          var numDaysFuture = 30;
          panel_details.forEach(function(pd) {
            if (pd.setting_name === 'Number of Future Days') {
              numDaysFuture = pd.detail_value || pd.setting_value || 30;
            }
          });

          Visits.getByID($scope.patient, numDaysFuture).then(function(visits) {
            console.log('Patient Plan - visits:', visits);
            $scope.visits = visits;
            $scope.visitsError = null;
          }).catch( function() {
            $scope.visitsError = 'Internal error loading visits.';
          });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };
  });
