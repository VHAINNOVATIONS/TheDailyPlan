'use strict';

angular.module('tdpApp')
  .directive('dtAllergies', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/allergies/allergies.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Allergy, uiGridConstants) {
        $scope.allergies = null;

        $scope.allergiesLoading = true;
        $scope.allergiesLoadError = null;

        $scope.allergiesGridOptions = {
          minRowsToShow: 3
        };

        $scope.allergiesGridOptions.columnDefs = [
          {name: 'allergenName', displayName: 'Name', width:'*' },
          {name: 'reaction', displayName: 'Reaction', width:'*' }
        ];

        Allergy.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - allergies:',data);
          if (data.status) {
            $scope.allergiesMessage = null;
            $scope.allergiesGridOptions.data = data.allergies;
          } else {
            $scope.allergiesMessage = (data.status === null) ? 'No Allergy Assessment' : 'No Known Allergies';
            $scope.allergiesGridOptions.data = data.allergies;
          }
          $scope.allergiesLoading = false;
        })
        .catch( function() {
          $scope.allergiesLoading = false;
          $scope.allergiesLoadError = 'Internal Error Loading Allergies';
        });
      }
    };
  });
