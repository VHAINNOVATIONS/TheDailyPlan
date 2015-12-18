'use strict';

angular.module('tdpApp')
  .controller('PatientSearchCtrl', function ($compile, $scope, $resource, $location, DTOptionsBuilder, DTColumnBuilder, Patient) {
  	var self = this;
    self.data = [];
    self.items = [];
    self.selected = {};
    self.selectAll = false;
    self.toggleAll = toggleAll;
    self.toggleOne = toggleOne;

    var titleHtml = '<input type="checkbox" ng-model="ctrl.selectAll" ng-click="ctrl.toggleAll(ctrl.selectAll, ctrl.selected)">';

    self.display = function() {
      angular.forEach(self.selected, function(value, key) {

        if(value === true)
        {
          this.push(key);
        }
      }, self.items);

      console.log('items:',self.items.length);
      if (self.items.length > 0)
        {
          Patient.setSelectedPatients(self.items);
          $location.path('/PatientPlan');
        }
    };

    self.searchAll = function() {
      self.submitted = true;

      Patient.searchAll(self.search.all)
      .then( function(data) {
        self.data = data;
        reloadData();
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    };

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
        .withPaginationType('full_numbers');

    self.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .renderWith(function(data, type, full, meta) {
                self.selected[full.id] = false;
                return '<input type="checkbox" ng-model="ctrl.selected[' + data.EIN + ']" ng-click="ctrl.toggleOne(ctrl.selected)">';
            }),
        DTColumnBuilder.newColumn('EIN').withTitle('EIN'),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('SSN').withTitle('SSN').renderWith(function(data, type, full) {
            return data.substr(0, 3) + '-' + data.substr(3, 2) + '-' + data.substr(5);
        }),
        DTColumnBuilder.newColumn('DOB').withTitle('DOB'),
        DTColumnBuilder.newColumn('sex').withTitle('Gender')
    ];

    self.newPromise = newPromise;
    self.reloadData = reloadData;
    self.dtInstance = {};

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

    function areSelected() {
      var items = [];
      angular.forEach(self.selected, function(value, key) {

        if(value === true)
        {
          this.push('id' + ': ' + key);
        }
      }, items);

      return items;
    }
  });
