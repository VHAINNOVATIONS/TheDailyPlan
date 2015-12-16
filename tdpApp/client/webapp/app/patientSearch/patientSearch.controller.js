'use strict';

angular.module('tdpApp')
  .controller('PatientSearchCtrl', function ($compile, $scope, $resource, DTOptionsBuilder, DTColumnBuilder, Patient) {
  	var self = this;
    self.data = [];
    self.selected = {};
    self.selectAll = false;
    self.toggleAll = toggleAll;
    self.toggleOne = toggleOne;

    var titleHtml = '<input type="checkbox" ng-model="showCase.selectAll" ng-click="showCase.toggleAll(showCase.selectAll, showCase.selected)">';


    self.searchAll = function() {
      self.submitted = true;
      console.log('User clicked submit with ', self.search);

      Patient.searchAll(self.search.all)
      .then( function(data) {
        self.data = data;
        reloadData();
        console.log('patient data:',self.data);
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
                return '<input type="checkbox" ng-model="showCase.selected[' + data.id + ']" ng-click="showCase.toggleOne(showCase.selected)">';
            }),
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
        DTColumnBuilder.newColumn('ssn').withTitle('SSN'),
        DTColumnBuilder.newColumn('birthDate').withTitle('DOB'),
        DTColumnBuilder.newColumn('gender').withTitle('Gender')
    ];

    self.newPromise = newPromise;
    self.reloadData = reloadData;
    self.dtInstance = {};

    function newPromise() {
      return new Promise( function(resolve, reject){
        if (self.data)
        {
          console.log('newPromise success',self.data);
          resolve(self.data);
        }
        else
        {
          console.log('newPromise failure');
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
