'use strict';

angular.module('tdpApp')
  .directive('dtOutpatientMeds', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/outpatientMeds/outpatientMeds.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, Medication) {
        $scope.outpatientMeds = null;

        $scope.outpatientMedsLoading = true;
        $scope.outpatientMedsLoadError = null;

        $scope.outpatientMedsGridOptions = {};

        $scope.outpatientMedsGridOptions.columnDefs = [
          { name: 'detail', displayName: 'Detail', width:'*'},
          { name: 'sig', displayName: 'Direction', width:'*'}
        ];
        Medication.getOutpatientMeds($scope.patient).then( function(data) {
          console.log('Patient Plan - outpatientMeds:', data);
          $scope.outpatientMedsGridOptions.data = data;
          $scope.outpatientMedsLoading = false;
        }).catch( function() {
          $scope.outpatientMedsLoading = false;
          $scope.outpatientMedsLoadError = 'Internal Error Loading Outpatient Meds';
        });

        $scope.outpatientMedsGridOptions.onRegisterApi = function(gridApi){
          $scope.outpatientMedsGridApi = gridApi;
        };
      }
    };
  });
