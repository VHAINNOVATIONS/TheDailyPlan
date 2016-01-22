'use strict';

angular.module('tdpApp')
  .directive('dtRadiologyReports', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/radiologyReports/radiologyReports.html',
      scope: {
        patient: '=',
      },
      controller: function ($scope, RadiologyReports) {

        $scope.radiologyReports = null;

        $scope.radiologyReportsLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);


        $scope.radiologyReportsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/radiologyReports/radiologyReportsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        $scope.radiologyReportsGridOptions.columnDefs = [
          { name: 'dateTime', displayName: 'Date' , width:'*' },
          { name: 'title', displayName: 'Title' , width:'*' },
          { name: 'status', displayName: 'Status', width:'*' }
        ];

        RadiologyReports.getByID($scope.patient)
        .then( function(data) {
          console.log('Patient Plan - radiologyReports:',data);
          $scope.radiologyReportsGridOptions.data = data;
          $scope.radiologyReportsLoading = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });

        $scope.radiologyReportsGridOptions.onRegisterApi = function(gridApi){
          $scope.radiologyReportsGridApi = gridApi;
        };

        $scope.expandRadiologyReportsRows = function() {
          $scope.radiologyReportsGridApi.expandable.expandAllRows();
        };

        $scope.collapseRadiologyReportsRows = function() {
          $scope.radiologyReportsGridApi.expandable.collapseAllRows();
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
