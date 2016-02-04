'use strict';

angular.module('tdpApp')
  //.controller('LayoutsCtrl', function ($scope, User, Auth) {
  .controller('LayoutsCtrl', ['$scope', '$location', 'Template', 'Panel_Type', 'Location', '$modal',
    function($scope, $location, Template, Panel_Type, Location, $modal){
    var self = this;
    self.errors = {};
    self.facilities = [];
    self.selectedA = [];
    self.selectedS = [];
    self.selectedPanels = [];
    self.masterPanelsList = [];
    self.availablePanels = [];

    function reset(){
      self.selectedA=[];
      self.selectedS=[];
      self.checkedA = false;
      self.checkedS = false;
    }

    //self.checkedA = true;
    //self.checkedS = true;

    Panel_Type.findAll()
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

      for(var k = from; k != to; k += increment){
        array[k] = array[k + increment];
      }
      array[to] = target;
    }

    self.addTemplate = function(form) {
      self.submitted = true;
      self.template.panels = self.selectedPanels;

      if(form.$valid) {
        Template.create(self.template)
        .then( function(data) {
          // Returns a Completed Template
          console.log('Record Created:',data);
          $location.path('/templateSearch');
        })
        .catch( function(err) {
          self.errors.other = err.message;
        });
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
      $scope.options = panel_settings;
    })
    .catch( function(err) {
      $scope.errors = err.message;
    });

    $scope.toggleOption = function() {
      if (!$scope.checkedOption) {
        $scope.selectedOption=[];
      }
      else {
        for (var i in $scope.options) {
          if ($scope.selectedOption.indexOf($scope.options[i].id) === -1) {
            $scope.selectedOption.push($scope.options[i].id);
          }
        }
      }
    };

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
      //angular.extend(panel, $scope.form);

      $uibModalInstance.close(panel);
    };

  }
]);
