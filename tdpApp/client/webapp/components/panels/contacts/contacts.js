'use strict';

angular.module('tdpApp')
  .directive('dtContacts', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/contacts/contacts.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope) {
        console.log('Patient Plan - contacts demographics:', $scope.patient);
      }
    };
  });
