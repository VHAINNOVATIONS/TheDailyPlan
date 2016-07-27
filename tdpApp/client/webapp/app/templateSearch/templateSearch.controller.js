'use strict';

angular.module('tdpApp')
  .controller('TemplateSearchCtrl', function ($compile, $scope, $q, $location, DTOptionsBuilder, DTColumnBuilder, Location, $filter, Template) {
  	var self = this;

    function newPromise() {
        return $q( function(resolve, reject){
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

    self.data = [];
    self.items = [];
    self.templates = [];
    self.selectedTemplate = {};
    self.selectedTemplateArray = [];
    self.wards = [];
    self.clinics = [];
    self.wardsSelected = [];
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
      self.submitted = true;
      self.clearAlerts();
      var nameStartsWith = self.search && self.search.all;
      Template.findAll().then(function(data) {
          if (nameStartsWith && nameStartsWith.length) {
            var n = nameStartsWith.length;
            nameStartsWith = nameStartsWith.toLowerCase();
            data = data.reduce(function(r, t) {
              var name = t.template_name;
              name = name && name.slice(0, n).toLowerCase();
              if (name === nameStartsWith) {
                r.push(t);
              }
              return r;
            }, []);
          }
          var wardsDictionary = self.wards.reduce(function(r, ward) {
              r[ward.id] = ward.name;
              return r;
          }, {});
          var clinicsDictionary = self.clinics.reduce(function(r, clinic) {
              r[clinic.id] = clinic.name;
              return r;
          }, {});
          data.forEach(function(t) {
              if (t.location_id) {
                  var locationName = t.location_type === 2 ? clinicsDictionary[t.location_id] : wardsDictionary[t.location_id];
                  if (locationName) {
                      t.locationName = locationName;
                  } else {
                      t.locationName = t.location_id;
                  }
              } else {
                t.locationName = null;
              }
          });
          self.data = data;
          self.noResults = !(data.length);
          reloadData();
      }).catch( function(err) {
          self.errors.other = err.message;
      });
    };

    self.searchClinic = function () {
      self.submitted = true;
      self.clearAlerts();
      var id = self.search && self.search.clinic;
      Template.findByClinic(id).then(function(data) {
          var clinicsDictionary = self.clinics.reduce(function(r, clinic) {
              r[clinic.id] = clinic.name;
              return r;
          }, {});
          data.forEach(function(t) {
              if (t.location_id) {
                  var locationName = clinicsDictionary[t.location_id];
                  if (locationName) {
                      t.locationName = locationName;
                  } else {
                      t.locationName = t.location_id;
                  }
              } else {
                t.locationName = null;
              }
          });
          self.data = data;
          self.noResults = !(data.length);
          reloadData();
      }).catch( function(err) {
          self.errors.other = err.message;
      });
    };

    self.searchWard = function () {
      self.submitted = true;
      self.clearAlerts();
      var id = self.search && self.search.ward;
      Template.findByWard(id).then(function(data) {
          var wardsDictionary = self.wards.reduce(function(r, ward) {
              r[ward.id] = ward.name;
              return r;
          }, {});
          data.forEach(function(t) {
              if (t.location_id) {
                  var locationName = wardsDictionary[t.location_id];
                  if (locationName) {
                      t.locationName = locationName;
                  } else {
                      t.locationName = t.location_id;
                  }
              } else {
                t.locationName = null;
              }
          });
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
        angular.forEach(self.selected, function(value, key) {
            var entry = {};
            if(value === true)
            {
              entry.id = key;
              this.push(entry);
            }
        }, self.items);

        switch(self.items.length) {
            case 0:
                self.displayErr.flag = true;
                self.displayErr.msg = 'Please select a template to '+ type + '.';
                break;
            case 1:
                //Template.setSelectedTemplates(self.items);
                $location.path('/layouts/' + type + '/' + self.items[0].id);
                break;
            default:
                self.items = [];
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

    // Initially Populate the Wards
    Location.getWards().then( function(data) {
        self.wards = data;
    }).catch( function(err) {
        self.errors.other = err.message;
    });

    // Initially Populate the Clinics
    Location.getClinics().then( function(data) {
        self.clinics = data;
    }).catch( function(err) {
        self.errors.other = err.message;
    });
});
