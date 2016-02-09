'use strict';

angular.module('tdpApp')
  .directive('dtLabs', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/labs/labs.html',
      scope: {
        patient: '=',
        panelid: '='
      },
      controller: function ($scope, Labs, Panel_Detail) {

        $scope.labs = null;

        $scope.labsLoading = true;
        console.log('Patient Plan - scope:patient:',$scope.patient);
        console.log('Patient Plan - scope:panelid:',$scope.panelid);


        $scope.labsGridOptions = {
          enableExpandable: false,
          expandableRowTemplate: 'components/panels/labs/labsExpRowTemplate.html',
          expandableRowHeight: 150,
          //subGridVariable will be available in subGrid scope
          expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
          }
        };

        /*$scope.labsGridOptions.columnDefs = [
          { name: 'specimen.collectionDate', displayName: 'Date' , width:'*' },
          { name: 'author.name', displayName: 'Author' , width:'*' },
          { name: 'labResults.length', displayName: 'No. Tests', width:'*' }
        ];*/

        $scope.labsGridOptions.columnDefs = [
          { name: 'date', displayName: 'Date' , width:'*' },
          { name: 'labTest.name', displayName: 'Name' , width:'**' },
          { name: 'value', displayName: 'Value', width:'*' },
          { name: 'labTest.units', displayName: 'Units', width:'*' },
          { name: 'labTest.refRange', displayName: 'Range', width:'*' }
        ];

        Panel_Detail.findCompleteByID($scope.panelid)
        .then( function(panel_details) {
          var labTests = [];
          console.log('Patient Plan - labs:',panel_details);
          for(var i = 0; i < panel_details.length; i++) {
            if (panel_details[i].setting_name === 'Tests') {
              labTests.push(panel_details[i].setting_value);
            }
          }

          Labs.setLabTestNames(labTests);

          Labs.getByID($scope.patient)
          .then( function(data) {
            console.log('Patient Plan - labs:',data);
            $scope.labsGridOptions.data = data;
            $scope.labsLoading = false;
          })
          .catch( function(err) {
            $scope.errors.other = err.message;
          });

        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });



        $scope.labsGridOptions.onRegisterApi = function(gridApi){
          $scope.labsGridApi = gridApi;
        };

        $scope.expandLabsRows = function() {
          $scope.labsGridApi.expandable.expandAllRows();
        };

        $scope.collapseLabsRows = function() {
          $scope.labsGridApi.expandable.collapseAllRows();
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
