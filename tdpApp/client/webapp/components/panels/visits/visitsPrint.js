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

        Visits.get($scope.patient, $scope.panelid)
        .then(function(visits) {
            console.log('Patient Plan - visits:', visits);
            $scope.visits = visits;
            $scope.visitsLoadError = null;
        })
        .catch( function(err) {
          $scope.visitsLoadError = 'Internal error loading visits: ' + err.message;
        });
      }
    };
  });
