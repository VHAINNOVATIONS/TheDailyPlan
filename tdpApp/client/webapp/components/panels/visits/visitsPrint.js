'use strict';

angular.module('tdpApp')
  .directive('dtVisitsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/visits/visitsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Visits) {
        console.log('Patient Plan - visits patient:', $scope.patient);
        Visits.getByID($scope.patient).then(function(visits) {
          console.log('Patient Plan - visits:', visits);
          $scope.visits = visits;
          $scope.visitsError = null;
        }).catch( function() {
          $scope.visitsError = 'Internal error loading visits.';
        });
      }
    };
  });
