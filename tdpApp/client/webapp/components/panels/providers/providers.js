'use strict';

angular.module('tdpApp')
  .directive('dtProviders', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/providers/providers.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope) {
        console.log('Patient Plan - providers:', $scope.patient);
      }
    };
  });
