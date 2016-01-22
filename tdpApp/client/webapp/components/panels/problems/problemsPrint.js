'use strict';

angular.module('tdpApp')
  .directive('dtProblemsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/problems/problemsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Problems) {
        console.log('Patient Plan - Problems patient:', $scope.patient);
        Problems.getByID($scope.patient).then(function(problems) {
          console.log('Patient Plan - problems:', problems);
          $scope.problems = problems;
          $scope.problemsError = null;
        }).catch( function() {
          $scope.problemsError = 'Internal error loading problems.';
        });
      }
    };
  });
