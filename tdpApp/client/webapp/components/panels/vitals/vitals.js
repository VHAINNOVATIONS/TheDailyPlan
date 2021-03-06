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
          },
          rowHeight:50,
          enablePinning: false,
          enableColumnMenus:false
        };

        $scope.vitalsGridOptions.columnDefs = [
          { name: 'dateTime', displayName: 'Date' , width:'*',
            cellTemplate: '<div class="ui-grid-cell-contents wrap" white-space: normal>{{COL_FIELD CUSTOM_FILTERS}}</div>' },
          { name: 'getTemp()', displayName: 'Temp' , width:'*' },
          { name: 'bloodPressure.value', displayName: 'BP', width:'*' },
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
