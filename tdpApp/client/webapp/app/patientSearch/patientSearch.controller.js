'use strict';

angular.module('tdpApp')
  .controller('PatientSearchCtrl', function ($compile, $scope, $resource, $location, DTOptionsBuilder, DTColumnBuilder, Patient, Location, $filter) {
  	var self = this;
    self.data = [];
    self.items = [];
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
    self.searchAll = searchAll;
    self.toggleAll = toggleAll;
    self.toggleOne = toggleOne;
    self.display = display;

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

    function display() {
      angular.forEach(self.selected, function(value, key) {
        console.log('patientSearch display!');

        var entry = {};

        if(value === true)
        {
          entry.id = key;
          entry.name = findName(key);
          this.push(entry);
        }

      }, self.items);

      console.log('items:',self.items.length);
      switch(self.items.length) {
        case 0:
          self.displayErr.flag = true;
          self.displayErr.msg = 'Please select a patient to display.';
          break;
        case 1:
          Patient.setSelectedPatients(self.items);
          $location.path('/PatientPlan');
          break;
        default:
          self.items = [];
          self.displayErr.flag = true;
          self.displayErr.msg = 'Please select only one patient to display.';
          break;
      }
    }

    function searchClinic() {
      self.submitted = true;
      self.clearAlerts();

      Patient.byClinic(self.search.clinic)
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

      Patient.byWard(self.search.ward)
      .then( function(data) {
        self.data = data;
        self.noResults = !(data.length);
        reloadData();
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    };


    function searchAll() {
      self.submitted = true;
      self.clearAlerts();

      Patient.searchAll(self.search.all)
      .then( function(data) {
        self.data = data;
        self.noResults = !(data.length);
        reloadData();
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    }

    function clearAlerts() {
      self.noResults = false;
      self.displayErr.flag = false;
    }

    function newPromise() {
      return new Promise( function(resolve, reject){
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

    function findName(id) {
         var item = $filter('filter')(self.data, {id: id}, true);
         if (item.length) {
             return item[0].name;
         } else {
             return 'Name Error';
         }
     }

    function areSelected() {
      console.log('patientSearch areSelected!');
      var items = [];
      angular.forEach(self.selected, function(value, key) {
        var entry = {};

        if(value === true)
        {
          entry.id = key;
          entry.name = findName(key);
          this.push(entry);
        }
      }, items);

      return items;
    }



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
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .renderWith(function(data, type, full, meta) {
                self.selected[full.id] = false;
                return '<input type="checkbox" ng-model="ctrl.selected[' + data.id + ']" ng-click="ctrl.toggleOne(ctrl.selected)">';
            }),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('SSN').withTitle('SSN').renderWith(function(data, type, full) {
          return !angular.isUndefined(data) ? data.substr(0, 3) + '-' + data.substr(3, 2) + '-' + data.substr(5) : '';
        }),
        DTColumnBuilder.newColumn('DOB').withTitle('DOB'),
        DTColumnBuilder.newColumn('age').withTitle('Age'),
        DTColumnBuilder.newColumn('sex').withTitle('Gender')
    ];


  });
