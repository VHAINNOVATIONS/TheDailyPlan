'use strict';

angular.module('tdpApp')
  .directive('dtVitals', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/vitals/vitals.html',
      scope: {
        patient: '=',
        paneldetail: '='
      },
      controller: function ($scope, Vitals) {

        $scope.vitals = null;

        $scope.vitalsLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);


        $scope.vitalsGridOptions = {
          expandableRowTemplate: 'components/panels/vitals/vitalsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.vitalsGridOptions.columnDefs = [
          { name: 'dateTime', displayName: 'Date' , width:'*' },
          { name: 'getTemp()', displayName: 'Temp' , width:'*' },
          { name: 'bloodPressure.value', displayName: 'Blood Pressure', width:'*' },
          { name: 'pulse.value', displayName: 'Pulse', width:'*' }
        ];

        Vitals.get($scope.patient, $scope.paneldetail)
        .then( function(data) {
          console.log('Patient Plan - vitals:',data);
          $scope.vitalsGridOptions.data = data;
          $scope.vitalsLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.vitalsGridOptions.onRegisterApi = function(gridApi){
          $scope.vitalsGridApi = gridApi;
        };

        $scope.expandVitalsRows = function() {
          $scope.vitalsGridApi.expandable.expandAllRows();
        };

        $scope.collapseVitalsRows = function() {
          $scope.vitalsGridApi.expandable.collapseAllRows();
        };

      }
    };
  });
