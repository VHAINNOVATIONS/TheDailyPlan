'use strict';

angular.module('tdpApp')
  .directive('dtIvMeds', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/ivMeds/ivMeds.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Medication) {
        $scope.ivMeds = null;

        $scope.ivMedsLoading = true;
        $scope.ivMedsLoadError = null;

        $scope.ivMedsGridOptions = {};

        $scope.ivMedsGridOptions.columnDefs = [
          { name: 'detail', displayName: 'Detail', width:'*'},
          { name: 'sig', displayName: 'Direction', width:'*'}
        ];

        Medication.getIvMeds($scope.patient).then( function(data) {
          console.log('Patient Plan - ivMeds:', data);
          $scope.ivMedsGridOptions.data = data;
          $scope.ivMedsLoading = false;
        }).catch( function() {
          $scope.ivMedsLoading = false;
          $scope.ivMedsLoadError = 'Internal Error Loading IV Meds';
        });

        $scope.ivMedsGridOptions.onRegisterApi = function(gridApi){
          $scope.ivMedsGridApi = gridApi;
        };
      }
    };
  });
