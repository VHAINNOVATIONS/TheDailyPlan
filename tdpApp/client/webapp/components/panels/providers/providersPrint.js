'use strict';

angular.module('tdpApp')
  .directive('dtProvidersPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/providers/providersPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope) {
        console.log('Patient Plan - providers:', $scope.patient);
        $scope.providersError = null;
      }
    };
  });
