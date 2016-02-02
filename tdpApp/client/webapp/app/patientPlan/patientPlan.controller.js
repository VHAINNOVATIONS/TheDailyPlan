'use strict';

angular.module('tdpApp')
  .controller('PatientPlanCtrl', function ($scope, $resource, Patient, Demographics, Template, Template_Layout, Panel, Panel_Type, Auth, Audit) {
  	var self = this;
    self.cdate = new Date();
    self.demographics = null;
    self.items = Patient.getSelectedPatients();
    self.patient = null;

    console.log('Patient Plan - Items:',self.items);

    $scope.printDailyPlan = function() {
      var accessInfo = {
        userId: Auth.getCurrentUser().duz,
        patientId: self.patient,
        action: 'print'
      };
      Audit.create(accessInfo).then( function(data) {
        console.log('Access Info:', data);
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
      window.print();
    };

    self.gridsterOptions = {
      margins: [20, 20],
      columns: 4,
      mobileBreakPoint: 768,
      mobileModeEnabled: true,
      draggable: {
        enabled: false,
        handle: 'h3'
      }
    };

    //Build the Panels based on the data returned from
    // DB.  The Array will be made up of objects like this.
    /*self.panels = [    {
      title: 'Problems',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
      }
      template: '<div dt-problems patient="ctrl.patient"></div>',
    }];*/

    self.panels = [];

    Template.findCompleteByID(1)
    .then( function(template) {
      self.panels = template;
    })
    .catch( function(err) {
      self.errors.other = err.message;
    });


    if(self.items.length > 0 && self.items[0])
    {
      self.patient = self.items[0];
      Demographics.getByID(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - demographics:',data);
        self.demographics = data;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    }
  })
// Gridster Custom Controller
.controller('CustomPanelCtrl', ['$scope', '$modal',
  function($scope, $modal) {

    $scope.remove = function(panel) {
      $scope.panels.splice($scope.panels.indexOf(panel), 1);
    };

    $scope.openSettings = function(panel) {
      $modal.open({
        scope: $scope,
        templateUrl: 'app/patientPlan/panel_settings.html',
        controller: 'PanelSettingsCtrl',
        resolve: {
          panel: function() {
            return panel;
          }
        }
      });
    };
  }
])
//Gridster - Panel Settings Modal
.controller('PanelSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$uibModalInstance', 'panel',
  function($scope, $timeout, $rootScope, $uibModalInstance, panel) {
    $scope.panel = panel;

    $scope.form = {
      title: panel.title,
      settings: {
        sizeX: panel.settings.sizeX,
        sizeY: panel.settings.sizeY,
        col: panel.settings.col,
        row: panel.settings.row
      }
    };

    $scope.sizeOptions = [{
      id: '1',
      name: '1'
    }, {
      id: '2',
      name: '2'
    }, {
      id: '3',
      name: '3'
    }, {
      id: '4',
      name: '4'
    }];

    $scope.dismiss = function() {
      $uibModalInstance.dismiss();
    };

    $scope.remove = function() {
      $scope.panels.splice($scope.panels.indexOf(panel), 1);
      $uibModalInstance.close();
    };

    $scope.submit = function() {
      console.log('PanelSettingsCtrl - panelSave:',panel);
      angular.extend(panel, $scope.form);

      $uibModalInstance.close(panel);
    };

  }
])
// helper code
.filter('object2Array', function() {
  return function(input) {
    var out = [];
    for (i in input) {
      out.push(input[i]);
    }
    return out;
  }
});

