'use strict';

angular.module('tdpApp')
  .controller('PatientPlanCtrl', function ($scope, $location, Patient, Demographics, Template, Panel, Auth, Audit, PDF, Facility) {
  	var self = this;
    self.cdate = new Date();
    self.demographics = null;
    self.patients = Patient.getSelectedPatients();
    // Based on constraints, patient array can ony have one element.
    self.patient = self.patients[0].id;
    self.templateID = self.patients[0].templateID;
    self.facilityName = Facility.getCurrentFacilityName();

    console.log('Patient Plan - patients:',self.patients);
    console.log('Patient Plan - patient:', self.patient);

    $scope.genPDF = function() {
        var accessInfo = {
          userId: Auth.getCurrentUser().duz,
          patientId: self.patient,
          action: 'pdf'
        };
        Audit.create(accessInfo).then( function(data) {
          console.log('Access Info:', data);
        })
        .catch( function(err) {
          self.errors.other = err.message;
        });
        PDF.generate([{
            id: self.patient,
            templateID: self.templateID
        }]).then(function(fileInfo) {
            var filepath = fileInfo.data.path;
            Patient.setPDFFilepath(filepath);
            $location.path('/PDFView');
        }).catch( function(err) {
            console.log(err);
        });
    };

    self.gridsterOptions = {
      pushing: true,
      floating: true,
      margins: [5, 5],
      columns: 6,
      mobileBreakPoint: 768,
      mobileModeEnabled: true,
      draggable: {
        enabled: true,
        handle: '.box-header'
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

    Template.findCompleteByID(self.templateID)
    .then( function(template) {
      self.panels = template;
    })
    .catch( function(err) {
      self.errors.other = err.message;
    });

    Demographics.getByID(self.patient)
    .then( function(data) {
      console.log('Patient Plan - demographics:',data);
      data.id = self.patient;
      self.demographics = data;
      Demographics.setDemographics(data);
    })
    .catch( function(err) {
      self.errors.other = err.message;
    });
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
  };
})
// ssn filter
.filter('ssnFilter', function () {
  return function (value, mask) {
    var len, val;
    if (mask == null) {
      mask = false;
    }
    if (value) {
      val = value.toString().replace(/\D/g, '');
      len = val.length;
      if (len < 4) {
        return val;
      } else if (3 < len && len < 6) {
        if (mask) {
          return '***-' + val.substr(3);
        } else {
          return val.substr(0, 3) + '-' + val.substr(3);
        }
      } else if (len > 5) {
        if (mask) {
          return '***-**-' + val.substr(5, 4);
        } else {
          return val.substr(0, 3) + '-' + val.substr(3, 2) + '-' + val.substr(5, 4);
        }
      }
    }
    return value;
  };
});

