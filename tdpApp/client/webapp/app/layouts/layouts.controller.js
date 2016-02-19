'use strict';

angular.module('tdpApp')
  .controller('LayoutsCtrl', ['$scope', '$location', 'Template', 'Panel_Type', 'Location', '$modal', 'Facility', '$stateParams',
    function($scope, $location, Template, Panel_Type, Location, $modal, Facility, $stateParams) {
    var self = this;
    self.errors = {};
    self.currentFacility = Facility.getCurrentFacility();
    self.facilities = [];
    self.selectedA = [];
    self.selectedS = [];
    self.selectedPanels = [];
    self.masterPanelsList = [];
    self.availablePanels = [];
    self.submitButton = '';

    //functions
    self.loadTemplate = loadTemplate;

    function reset(){
      self.selectedA=[];
      self.selectedS=[];
      self.checkedA = false;
      self.checkedS = false;
    }

    self.mode = $stateParams.mode;
    self.displayOnly = false;
    self.templateID = $stateParams.id;

    switch(self.mode) {
      case 'create':
        self.submitButton = 'Save';
        break;
      case 'edit':
        self.submitButton = 'Update';
         loadTemplate(self.templateID);
        break;
      case 'display':
        self.displayOnly = true;
        self.submitButton = 'Done';
         loadTemplate(self.templateID);
        break;
      default:
        // set error and send back to templateSearch
        self.cancelTemplate();
        break;
    }

    Panel_Type.findAllByFacilityID(self.currentFacility)
    .then( function(panel_types) {
      // Initialize Available Panels and Keep a Master List
      reset();
      self.masterPanelsList = panel_types;

      for (var i = 0; i < panel_types.length; i++) {
        panel_types[i].mandatory ? self.selectedPanels.push(panel_types[i]) : self.availablePanels.push(panel_types[i]);
      };
    })
    .catch( function(err) {
      self.errors.other = err.message;
    });

    Location.getWards()
    .then( function(wards) {
      self.wards = wards;
    })
    .catch( function(err) {
      self.errors.other = err.message;
    });

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    function move(array, from, to) {
      if( to === from ) return;

      var target = array[from];
      var increment = to < from ? -1 : 1;

      for(var k = from; k !== to; k += increment){
        array[k] = array[k + increment];
      }
      array[to] = target;
    }

    function loadTemplate(id) {
      Template.findByID(id)
      .then (function(template) {
        self.template = template;

        Template.findCompleteByID(id)
        .then( function(templateLayout) {
          //self.template.panels = templateLayout;
          self.selectedPanels = templateLayout;
          for (var i = 0; i < templateLayout.length; i++) {
            var delId = arrayObjectIndexOf(self.availablePanels, templateLayout[i].id, 'id');
            if (delId !== -1) {
              self.availablePanels.splice(delId,1);
            }
          }
        });

      }).catch( function(err) {
        self.errors.other = err.message;
      });
    }

    self.processTemplate = function(form) {
      self.submitted = true;
      self.template.facility_id = self.currentFacility;
      self.template.panels = self.selectedPanels;

      if(form.$valid) {
        switch(self.mode) {
          case 'create':
            Template.create(self.template)
            .then( function(data) {
              // Returns a Completed Template
              $location.path('/templateSearch');
              return;
            })
            .catch( function(err) {
              self.errors.other = err;
            });
            break;
          case 'edit':
            // Put the logic here to do the updates
            break;
          case 'display':
            $location.path('/templateSearch');
            break;
          default:
            // set error and send back to templateSearch
            self.cancelTemplate();
            break;
        }
      }
    };

    self.cancelTemplate = function() {

      $location.path('/templateSearch');
      return;
    };

    self.aToS = function() {
      var i;
      for (i in self.selectedA) {
        var moveId = arrayObjectIndexOf(self.masterPanelsList, self.selectedA[i], 'id');
        self.selectedPanels.push(self.masterPanelsList[moveId]);
        var delId = arrayObjectIndexOf(self.availablePanels, self.selectedA[i], 'id');
        self.availablePanels.splice(delId,1);
      }
      reset();
    };

    self.sToA = function() {
      var i;
      for (i in self.selectedS) {
        var moveId = arrayObjectIndexOf(self.masterPanelsList, self.selectedS[i], 'id');

        if (!self.masterPanelsList[moveId].mandatory) {
          self.availablePanels.push(self.masterPanelsList[moveId]);
          var delId = arrayObjectIndexOf(self.selectedPanels, self.selectedS[i], 'id');
          self.selectedPanels.splice(delId,1);
        }
      }
      reset();
    };

    self.moveUp = function() {
      for (var i in self.selectedS) {
        var upId = arrayObjectIndexOf(self.selectedPanels, self.selectedS[i], 'id');
        if (upId <= 0) {
          reset();
        } else {
          move(self.selectedPanels, upId, upId-1);
        }
      }
    };

    self.moveDown = function() {
      for (var i in self.selectedS) {
        var downId = arrayObjectIndexOf(self.selectedPanels, self.selectedS[i], 'id');
        if (downId >= self.selectedPanels.length - 1) {
          reset();
        } else {
          move(self.selectedPanels, downId, downId+1);
        }
      }
    };

    self.toggleA = function() {
      if (!self.checkedA) {
        self.selectedA=[];
      }
      else {
        for (var i in self.availablePanels) {
          if (self.selectedA.indexOf(self.availablePanels[i].id) === -1) {
            self.selectedA.push(self.availablePanels[i].id);
          }
        }
      }
    };

    self.toggleS = function() {
      if (!self.checkedS) {
        self.selectedS=[];
      }
      else {
        for (var i in self.selectedPanels) {
          if (self.selectedS.indexOf(self.selectedPanels[i].id) === -1) {
            self.selectedS.push(self.selectedPanels[i].id);
          }
        }
      }
    };

    self.selectA = function(i) {
      if (self.selectedA.indexOf(i) === -1) {
        self.selectedA.push(i);
      } else {
        self.selectedA.splice(self.selectedA.indexOf(i),1);
        if (self.checkedA) self.checkedA = false;
      }
    };

    self.selectS = function(i) {
      if (self.selectedS.indexOf(i) === -1) {
        self.selectedS.push(i);
      } else {
        self.selectedS.splice(self.selectedS.indexOf(i),1);
        if (self.checkedS) self.checkedS = false;
      }
    };

    self.openSettings = function(panel) {
      $modal.open({
        scope: $scope,
        templateUrl: 'app/layouts/customizer.html',
        controller: 'CustomizerCtrl',
        resolve: {
          panel: function() {
            return panel;
          }
        }
      });
    };
  }])
// Customizer Controller Settings Modal
.controller('CustomizerCtrl', ['$scope', '$timeout', '$rootScope', '$uibModalInstance', 'panel', 'Panel_Setting',
  function($scope, $timeout, $rootScope, $uibModalInstance, panel, Panel_Setting) {
    $scope.panel = panel;
    $scope.options = [];
    $scope.selectedOption = [];
    $scope.checkedOption = false;

    Panel_Setting.findByPanelTypeID(panel.id)
    .then( function(panel_settings) {
      $scope.settings = panel_settings;
      if (panel.panelDetails) {
        for (var i = 0; i < panel.panelDetails.length; i++) {
          $scope.selectedOption.push(panel.panelDetails[i].panel_setting_id);
        };
      }

    })
    .catch( function(err) {
      $scope.errors = err.message;
    });

    $scope.selectOption = function(i) {
      if ($scope.selectedOption.indexOf(i) === -1) {
        $scope.selectedOption.push(i);
      } else {
        $scope.selectedOption.splice($scope.selectedOption.indexOf(i),1);
        if ($scope.checkedOption) $scope.checkedOption = false;
      }
    };

    $scope.dismiss = function() {
      $uibModalInstance.dismiss();
    };

    $scope.submit = function() {
      console.log('CustomizerCtrl - panelSave:',panel);
      var panelDetails = [];
      if ($scope.selectedOption.length > 0) {
        for (var i = 0; i < $scope.selectedOption.length; i++) {
          var detail = {};
          detail.panel_setting_id = $scope.selectedOption[i];
          panelDetails.push(detail);
        };
        $scope.panel.panelDetails = panelDetails;
      }

      angular.extend(panel, $scope.panel);

      $uibModalInstance.close(panel);
    };

  }
]);
