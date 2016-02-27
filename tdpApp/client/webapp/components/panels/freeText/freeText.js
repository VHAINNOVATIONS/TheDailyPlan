'use strict';

angular.module('tdpApp')
  .directive('dtFreeText', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/freeText/freeText.html',
      scope: {
        patient: '=',
        detail: '='
      },
      controller: function ($scope, FreeText) {
        $scope.textContent = $scope.detail;
        $scope.textLoading = true;
        var tius = $scope.textContent && $scope.textContent.match(/\|[^\|]+\|/g);
        if (tius && tius.length) {
          FreeText.resolveFreeTextTemplates($scope.patient, tius.join('^'))
          .then( function(data) {
            console.log('Free Text - resolved:',data);
            var pieces = data.split('^');
            var text = $scope.textContent;
            for (var i=0; i<pieces.length; ++i) {
              text = text.replace(tius[i], pieces[i]);
            }
            $scope.textContent = text;
            $scope.textLoading = false;
          })
          .catch( function(err) {
            $scope.errors.other = err.message;
          });
        } else {
          $scope.textLoading = false;
        }
      }
    };
  });
