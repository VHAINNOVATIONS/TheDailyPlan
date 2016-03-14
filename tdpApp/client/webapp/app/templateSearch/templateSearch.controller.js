'use strict';

angular.module('tdpApp')
  .controller('TemplateSearchCtrl', function ($compile, $scope, $q, $location, DTOptionsBuilder, DTColumnBuilder, Location, $filter, Template) {
  	var self = this;

    self.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
            //return $resource('data1.json').query().$promise;
            return newPromise();
        })
        .withOption('createdRow', function(row, data, dataIndex) {
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
            .renderWith(function(data, type, full, meta) {
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
    var titleHtml = '<input type="checkbox" ng-model="ctrl.selectAll" ng-click="ctrl.toggleAll(ctrl.selectAll, ctrl.selected)">';

    //functions
    self.newPromise = newPromise;
    self.reloadData = reloadData;
    self.clearAlerts = clearAlerts;
    self.searchWard =searchWard;
    self.searchClinic = searchClinic;

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

    self.toggleAll = toggleAll;
    self.toggleOne = toggleOne;

    self.display = function () {
      editOrDisplay('display');
    };

    self.edit = function () {
      editOrDisplay('edit');
    };

    self.create = function () {
      $location.path('/layouts/create/');
    };

    // Initially Populate the Wards
    Location.getWards()
    .then( function(data) {
      self.wards = data;
    })
    .catch( function(err) {
      self.errors.other = err.message;
    });

    // Initially Populate the Clinics
    Location.getClinics()
    .then( function(data) {
      self.clinics = data;
    })
    .catch( function(err) {
      self.errors.other = err.message;
    });

    function editOrDisplay(type) {
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

    function searchClinic() {
      self.submitted = true;
      self.clearAlerts();

      Template.byClinic(self.search.clinic)
      .then( function(data) {
        self.data = data;
        self.noResults = !(data.length);
        reloadData();
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    }

    function searchWard() {
      self.submitted = true;
      self.clearAlerts();

      Template.byWard(self.search.ward)
      .then( function(data) {
        self.data = data;
        self.noResults = !(data.length);
        reloadData();
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    };

    function clearAlerts() {
      self.noResults = false;
      self.displayErr.flag = false;
    }

    function newPromise() {
      return $q( function(resolve, reject){
        if (self.data)
        {
          resolve(self.data);
        }
        else
        {
          resolve([]);
        }
      });
    }

    function reloadData() {
        var resetPaging = true;
        self.dtInstance.reloadData(callback, resetPaging);
    }

    function callback(json) {
        console.log(json);
    }

    function toggleAll (selectAll, selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                selectedItems[id] = selectAll;
            }
        }
    }
    function toggleOne (selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                if(!selectedItems[id]) {
                    self.selectAll = false;
                    return;
                }
            }
        }
        self.selectAll = true;
    }

  });
