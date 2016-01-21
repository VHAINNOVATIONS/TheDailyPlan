'use strict';

angular.module('tdpApp')
  .controller('PatientPlanCtrl', function ($scope, $resource, Patient, Demographics, Template, Template_Layout, Panel, Panel_Type) {
  	var self = this;
    self.cdate = new Date();
    self.demographics = null;
    self.items = Patient.getSelectedPatients();
    self.patient = null;

    console.log('Patient Plan - Items:',self.items);

    $scope.printDailyPlan = function() {
      window.print();
    };

    self.gridsterOptions = {
      margins: [20, 20],
      columns: 4,
      draggable: {
        enabled: false,
        handle: 'h3'
      }
    };

    //Build the Panels based on the data returned from
    // DB.
/*    self.panels = [];

    Template_Layout.findAllByTemplateID(1)
      .then( function(tLayout) {
        json.forEach(function(tLayout)
        {
          var panelObj = {};
          Panel.findByID(tLayout.panel_id)
          .then ( function(panel){
            Panel_Type.findByID(panel.panel_type_id)
            .then ( function(pType){
              panelObj.title = pType.title;
              panelObj.settings.sizeX = panel.sizeX;
              panelObj.settings.sizeY = panel.sizeY;
              panelObj.settings.minSizeX = pType.minSizeX;
              panelObj.settings.minSizeY = pType.minSizeY;
              panelObj.template = '<div> ' + pType.directive + ' patient="ctrl.' + pType.scope_variable +'"></div>';
            });
          });
        });
        console.log(panelObj);
        self.panels.push(panelObj);

      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
*/
    self.panels = [
    {
      title: 'Problems',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-problems patient="ctrl.patient"></div>',
        print: '<div dt-problems-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 2
        }
      }
    },
    {
      title: 'Vitals',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-vitals patient="ctrl.patient"></div>',
        print: '<div dt-vitals-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    },{
      title: 'Active Medications',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-active-meds patient="ctrl.patient"></div>',
        print: '<div dt-active-meds-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    }, {
      title: 'Diet Orders',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-diet-orders patient="ctrl.patient"></div>',
        print: '<div dt-diet-orders-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    },
    {
      title: 'Lab Orders',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-lab-orders patient="ctrl.patient"></div>',
        print: '<div dt-lab-orders-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    },{
      title: 'Radiology Reports',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-radiology-reports patient="ctrl.patient"></div>',
        print: '<div dt-radiology-reports-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    },
    {
      title: 'Visits',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-visits patient="ctrl.patient"></div>',
        print: '<div dt-visits-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    },{
      title: 'Allergies',
      settings: {
        sizeX: 3,
        sizeY: 1,
        minSizeX: 2,
        minSizeY: 1,
        template: '<div dt-allergies patient="ctrl.patient"></div>',
        print: '<div dt-allergies-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    },
    {
      title: 'Immunizations',
      settings: {
        sizeX: 3,
        sizeY: 1,
        minSizeX: 2,
        minSizeY: 1,
        template: '<div dt-immunizations patient="ctrl.patient"></div>',
        print: '<div dt-immunizations-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 3
        }
      }
    },{
      title: 'IV Medications',
      settings: {
        sizeX: 3,
        sizeY: 3,
        minSizeX: 2,
        minSizeY: 2,
        template: '<div dt-iv-meds patient="ctrl.patient"></div>',
        print: '<div dt-iv-meds-print patient="ctrl.patient"></div>',
        widgetSettings: {
          id: 1
        }
      }
    }];

    if(self.items.length > 0 && self.items[0])
    {
      self.patient = self.items[0];
      $scope.patient = self.patient;
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

