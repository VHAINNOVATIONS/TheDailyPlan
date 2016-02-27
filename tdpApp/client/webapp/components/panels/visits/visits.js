'use strict';

angular.module('tdpApp')
  .directive('dtVisits', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/visits/visits.html',
      scope: {
        patient: '=',
        panelid: '='
      },
      controller: function ($scope, Visits, Panel_Detail) {
        console.log('Patient Plan Print - visits patient:', $scope.patient);
        console.log('Patient Plan Print - visits panelid:', $scope.panelid);

        $scope.visits = null;

        $scope.visitsLoading = true;
        $scope.visitsLoadError = null;

        $scope.visitsGridOptions = {};

        $scope.visitsGridOptions.columnDefs = [
          { name: 'time', displayName: 'Date' , width:'*' },
          { name: 'clinic', displayName: 'Clinic' , width:'*' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        Panel_Detail.findCompleteByID($scope.panelid)
        .then( function(panel_details) {
          var numDaysFuture = 30;
          panel_details.forEach(function(pd) {
            if (pd.setting_name === 'Number of Future Days') {
              numDaysFuture = pd.detail_value || pd.setting_value || 30;
            }
          });
          Visits.getByID($scope.patient, numDaysFuture)
          .then( function(data) {
            console.log('Patient Plan - visits:',data);
            $scope.visitsGridOptions.data = data;
            $scope.visitsLoading = false;
          })
          .catch( function(err) {
            $scope.visitsLoading = false;
            $scope.visitsLoadError = 'Internal error loading visits: ' + err.message;
          });
        })
        .catch( function(err) {
          $scope.visitsLoading = false;
          $scope.visitsLoadError = 'Internal error loading visits: ' + err.message;
        });
     }
    };
  });
