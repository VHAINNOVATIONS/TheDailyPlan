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

        $scope.allergiesGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/allergies/allergiesExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.allergiesGridOptions.columnDefs = [
          { name: 'allergenName', displayName: 'Name', width:'*' },
          { name: 'allergenType', displayName: 'Type', width:'*' ,
            sort: {
              direction: uiGridConstants.ASC,
              priority: 1,
            }
          },
          { name: 'reactions[0].name', displayName: 'Reaction', width:'*' }
        ];

        Allergy.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - allergies:',data);
          $scope.allergiesGridOptions.data = data;
          $scope.allergiesLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.allergiesGridOptions.onRegisterApi = function(gridApi){
          $scope.allergiesGridApi = gridApi;
        };

        $scope.expandAllergyRows = function() {
          $scope.allergiesGridApi.expandable.expandAllRows();
        };

        $scope.collapseAllergyRows = function() {
          $scope.allergiesGridApi.expandable.collapseAllRows();
        };

      }
    };
  });
