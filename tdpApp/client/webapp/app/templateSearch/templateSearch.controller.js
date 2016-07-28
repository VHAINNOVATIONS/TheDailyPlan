'use strict';

angular.module('tdpApp').controller('TemplateSearchCtrl', function ($compile, $scope, $q, $location, DTOptionsBuilder, DTColumnBuilder, Location, Template) {
    	var self = this;

      function newPromise() {
          return $q( function(resolve){
              if (self.data) {
                  resolve(self.data);
              } else {
                resolve([]);
              }
          });
      }

      function reloadData() {
          var resetPaging = true;
          self.dtInstance.reloadData(function(json) {
            console.log(json);
          }, resetPaging);
      }

      self.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
          return newPromise();
      })
      .withOption('createdRow', function(row) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
      })
      .withOption('headerCallback', function(header) {
          if (!self.headerCompiled) {
              // Use this headerCompiled field to only compile header once
              self.headerCompiled = true;
              $compile(angular.element(header).contents())($scope);
          }
      })
      .withPaginationType('full_numbers')
      .withOption('aaSorting', [[1, 'asc']])
      // Active Responsive plugin
      .withOption('responsive', true);

      self.dtColumns = [
          DTColumnBuilder.newColumn(null).withTitle('Select').notSortable()
              .renderWith(function(data, type, full) {
                  self.selected[full.id] = false;
                  return '<input type="checkbox" ng-model="ctrl.selected[' + data.id + ']" ng-click="ctrl.toggleOne(ctrl.selected)">';
              }),
          DTColumnBuilder.newColumn('template_name').withTitle('Name'),
          DTColumnBuilder.newColumn('template_description').withTitle('Description'),
          DTColumnBuilder.newColumn('locationName').withTitle('Location'),
          DTColumnBuilder.newColumn('active').withTitle('Active')
      ];

      // Initially Populate the Wards
      self.wards = [];
      Location.getWards().then( function(data) {
          self.wards = data;
      }).catch( function(err) {
          self.errors.other = err.message;
      });

      // Initially Populate the Clinics
      self.clinics = [];
      Location.getClinics().then( function(data) {
          self.clinics = data;
      }).catch( function(err) {
          self.errors.other = err.message;
      });

      self.tabInfo = Template.tabInfo();

      self.data = [];

      self.selected = {};
      self.selectAll = false;
      self.noResults = false;
      self.dtInstance = {};
      self.displayErr = {};
      self.displayErr.flag = false;
      self.errors = {};

      //functions
      self.newPromise = newPromise;
      self.reloadData = reloadData;

      self.clearAlerts = function () {
          self.noResults = false;
          self.displayErr.flag = false;
      };

      self.searchAll = function () {
          self.clearAlerts();
          var text = self.tabInfo[0].search;
          Template.findAll(text).then(function(data) {
              self.data = data;
              self.noResults = !(data.length);
              reloadData();
          }).catch( function(err) {
              self.errors.other = err.message;
          });
      };

      self.searchWard = function () {
          self.clearAlerts();
          var id = self.tabInfo[1].search;
          Template.findByWard(id).then(function(data) {
              self.data = data;
              self.noResults = !(data.length);
              reloadData();
          }).catch( function(err) {
              self.errors.other = err.message;
          });
      };

      self.searchClinic = function () {
          self.clearAlerts();
          var id = self.tabInfo[2].search;
          Template.findByClinic(id).then(function(data) {
              self.data = data;
              self.noResults = !(data.length);
              reloadData();
          }).catch( function(err) {
              self.errors.other = err.message;
          });
      };

      self.toggleAll = function (selectAll, selectedItems) {
          for (var id in selectedItems) {
              if (selectedItems.hasOwnProperty(id)) {
                  selectedItems[id] = selectAll;
              }
          }
      };

      self.toggleOne = function (selectedItems) {
          for (var id in selectedItems) {
              if (selectedItems.hasOwnProperty(id)) {
                  if(!selectedItems[id]) {
                      self.selectAll = false;
                      return;
                  }
              }
          }
          self.selectAll = true;
      };

      function editDeleteOrDisplay(type) {
          var items = [];
          angular.forEach(self.selected, function(value, key) {
              if(value === true) {
                  this.push({
                      id: key
                  });
              }
          }, items);

          switch(items.length) {
              case 0:
                  self.displayErr.flag = true;
                  self.displayErr.msg = 'Please select a template to '+ type + '.';
                  break;
              case 1:
                  $location.path('/layouts/' + type + '/' + items[0].id);
                  break;
              default:
                  items = [];
                  self.displayErr.flag = true;
                  self.displayErr.msg = 'Please select only one template to '+ type + '.';
                  break;
          }
      }

      self.display = function () {
          editDeleteOrDisplay('display');
      };

      self.edit = function () {
          editDeleteOrDisplay('edit');
      };

      self.create = function () {
          $location.path('/layouts/create/');
      };

      self.delete = function(){
          editDeleteOrDisplay('delete');
      };
});
