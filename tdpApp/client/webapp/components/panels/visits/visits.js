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

        $scope.visits = null;

        $scope.visitsLoading = true;
        console.log('Patient Plan Visit - scope:patient:',$scope.patient);
        console.log('Patient Plan Visit - scope:panelid:',$scope.panelid);

        $scope.visitsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/visits/visitsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

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
            $scope.errors.other = err.message;
          });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.visitsGridOptions.onRegisterApi = function(gridApi){
          $scope.visitsGridApi = gridApi;
        };

        $scope.expandVisitsRows = function() {
          $scope.visitsGridApi.expandable.expandAllRows();
        };

        $scope.collapseVisitsRows = function() {
          $scope.visitsGridApi.expandable.collapseAllRows();
        };

      }/*,
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.data = data;
          }
        });
      }*/
    };
  });
