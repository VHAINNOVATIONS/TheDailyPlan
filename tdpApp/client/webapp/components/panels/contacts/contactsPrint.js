'use strict';

angular.module('tdpApp')
  .directive('dtContactsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/contacts/contactsPrint.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope) {
        console.log('Patient Plan - contacts demographics:', $scope.patient);
        $scope.contactsError = null;
      }
    };
  });
