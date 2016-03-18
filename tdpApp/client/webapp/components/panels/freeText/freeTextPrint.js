'use strict';

angular.module('tdpApp')
  .directive('dtFreeTextPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/freeText/freeTextPrint.html',
      scope: {
        patient: '=',
        paneldetail: '='
      },
      controller: function ($scope, FreeText) {
        $scope.loadError = null;
        FreeText.get($scope.patient, $scope.paneldetail)
          .then( function(content) {
            $scope.textContent = content;
          })
          .catch( function(err) {
            $scope.loadError = 'Internal error: ' + err.message;
          });
      }
    };
  });
