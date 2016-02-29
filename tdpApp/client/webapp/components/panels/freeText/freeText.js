'use strict';

angular.module('tdpApp')
  .directive('dtFreeText', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/freeText/freeText.html',
      scope: {
        patient: '=',
        panelid: '='
      },
      controller: function ($scope, FreeText) {
        $scope.loading = true;
        $scope.loadError = null;

        FreeText.get($scope.patient, $scope.panelid)
          .then( function(content) {
            $scope.textContent = content;
            $scope.loading = false;
          })
          .catch( function(err) {
            $scope.loading = false;
            $scope.loadError = 'Internal error: ' + err.message;
          });
      }
    };
  });
