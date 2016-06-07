'use strict';

angular.module('tdpApp')
    .controller('PatientSearchCtrl', function($compile, $scope, $q, $location, DTOptionsBuilder, DTColumnBuilder, Patient, Location, Auth, Audit, $filter, Template, PDF) {
        var self = this;
        self.data = [];
        self.templates = [];
        self.selectedTemplate = {};
        self.defaultTemplate = {};
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
        var titleHtml = '<label for="selectchkall" style="display: none">select</label><input type="checkbox" id="selectchkall" ng-model="ctrl.selectAll" ng-click="ctrl.toggleAll(ctrl.selectAll, ctrl.selected)"> ';
        var templateHeaderHtml = '<div><label>Template</label>' +
                                 '<select name="templateSelectAll" class="form-control"' +
                                 'ng-model="ctrl.defaultTemplate" ng-change="ctrl.selectAllTemplate()">' +
                                 '<option ng-repeat="option in ctrl.templates" value="{{option.id}}">{{option.template_name}}</option></select>'+
                                 '</div>';

        //functions
        self.newPromise = newPromise;
        self.reloadData = reloadData;
        self.clearAlerts = clearAlerts;
        self.searchWard = searchWard;
        self.searchClinic = searchClinic;
        self.searchAll = searchAll;
        self.toggleAll = toggleAll;
        self.toggleOne = toggleOne;
        self.patientClick = patientClick;
        self.selectAllTemplate = selectAllTemplate;

        // Populate the Templates
        Template.findAll()
            .then(function(data) {
                self.templates = data;
            })
            .catch(function(err) {
                self.errors.other = err.message;
            });

        // Initially Populate the Wards
        Location.getWards()
            .then(function(data) {
                self.wards = data;
            })
            .catch(function(err) {
                self.errors.other = err.message;
            });

        // Initially Populate the Clinics
        Location.getClinics()
            .then(function(data) {
                self.clinics = data;
            })
            .catch(function(err) {
                self.errors.other = err.message;
            });

        self.display = function () {
            console.log('patientSearch display!');

            var items = [];
            angular.forEach(self.selected, function(value, key) {
                var entry = {};

                if (value === true) {
                    entry.id = key;
                    entry.name = findName(key);
                    entry.templateID = findTemplate(key);
                    this.push(entry);
                }

            }, items);

            console.log('items:', items.length);

            if (items.length === 0) {
                self.displayErr.flag = true;
                self.displayErr.msg = 'Please select a patient to display.';
                return;
            }

            if (items.length > 1) {
                self.displayErr.flag = true;
                self.displayErr.msg = 'Please select only one patient to display.';
                return;
            }

            var selectedItem = items[0];

            if (selectedItem.templateID === null) {
                self.displayErr.flag = true;
                self.displayErr.msg = 'Please select a template to display.';
                return;
            }

            Patient.setSelectedPatients(items);
            $location.path('/PatientPlan');

            var accessInfo = {
                userId: Auth.getCurrentUser().duz,
                patientId: selectedItem.id,
                action: 'view'
            };
            Audit.create(accessInfo).then(function(data) {
                    console.log('Access Info:', data);
                })
                .catch(function(err) {
                    console.log('Error filing access info: %s', err.message);
                });
        };

        self.genPDF = function () {
            var order = self.dtInstance.DataTable.rows()[0];
            var items = [];
            var auditItems = [];
            var userId = Auth.getCurrentUser().duz;
            order.forEach(function(index) {
                var datum = self.data[index];
                var id = datum.id;
                if (self.selected[id]) {
                    items.push({
                        id: id,
                        templateID: findTemplate(id)
                    });
                    auditItems.push({
                        userId: userId,
                        patientId: id,
                        action: 'multipdf'
                    });
                }
            });

            if (items.length < 1) {
                self.displayErr.flag = true;
                self.displayErr.msg = 'Please select a patient to display.';
                return;
            }

            PDF.generate(items).then(function(fileInfo) {
                var filepath = fileInfo.data.path;
                Patient.setPDFFilepath(filepath);
                $location.path('/PDFView');
            }).catch( function(err) {
                console.log(err);
            });

            Audit.bulkCreate(auditItems).then(function(data) {
                console.log('Access Info:', data);
            });
        };

        function setDefaultTemplate(data) {
            if (data.length && self.templates.length) {
                var founds = $filter('filter')(self.templates, {'template_name': 'Default'}, true);
                var found = founds[0] ? founds[0] : self.templates[0];
                self.defaultTemplate = found.id.toString();
                data.forEach(function(patient) {
                    self.selectedTemplate[patient.id] = found.id.toString();
                });
            }
        }

        function searchClinic() {
            self.submitted = true;
            self.clearAlerts();

            Patient.byClinic(self.search.clinic)
                .then(function(data) {
                    reloadData(data);
                })
                .catch(function(err) {
                    self.errors.other = err.message;
                });
        }

        function searchWard() {
            self.submitted = true;
            self.clearAlerts();

            Patient.byWard(self.search.ward)
                .then(function(data) {
                    reloadData(data);
                })
                .catch(function(err) {
                    self.errors.other = err.message;
                });
        };

        function searchAll() {
            self.submitted = true;
            self.clearAlerts();

            Patient.searchAll(self.search.all)
                .then(function(data) {
                    reloadData(data);
                })
                .catch(function(err) {
                    self.errors.other = err.message;
                });
        }

        function clearAlerts() {
            self.noResults = false;
            self.displayErr.flag = false;
        }

        function newPromise() {
            return $q(function(resolve, reject) {
                if (self.data) {
                    resolve(self.data);
                } else {
                    resolve([]);
                }
            });
        }

        function reloadData(data) {
            self.data = data;
            self.noResults = !(data.length);
            setDefaultTemplate(data);
            var resetPaging = true;
            self.dtInstance.reloadData(callback, resetPaging);
        }

        function callback(json) {
            console.log(json);
        }

        function toggleAll(selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }

        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if (!selectedItems[id]) {
                        self.selectAll = false;
                        return;
                    }
                }
            }
            self.selectAll = true;
        }

        function findName(id) {
            var item = $filter('filter')(self.data, {
                id: id
            }, true);
            if (item.length) {
                return item[0].name;
            } else {
                return 'Name Error';
            }
        }

        function findTemplate(id) {
            console.log('findTemplate id:', id);
            angular.forEach(self.selectedTemplate, function(value, key) {
                var entry = {};
                console.log('selectedTemplate key:', key);

                entry.id = key;
                entry.templateID = value;
                this.push(entry);

            }, self.selectedTemplateArray);

            var item = $filter('filter')(self.selectedTemplateArray, {
                id: id
            }, true);
            if (item.length) {
                console.log('findTemplate found! ', item[0]);
                return item[0].templateID;
            } else {
                return null;
            }
        }

        function areSelected() {
            console.log('patientSearch areSelected!');
            var items = [];
            angular.forEach(self.selected, function(value, key) {
                var entry = {};

                if (value === true) {
                    entry.id = key;
                    entry.name = findName(key);
                    this.push(entry);
                }
            }, items);

            return items;
        }

        function patientClick(obj){
            obj.preventDefault();
            var target = angular.element(obj.target);
            var id = target.attr('data-id');
            var items = [];
            var entry  = {};
            entry.id = id;
            entry.name = findName(id);
            entry.templateID = findTemplate(id);
            items.push(entry);
            Patient.setSelectedPatients(items);
            $location.path('/PatientPlan');

            var accessInfo = {
                userId: Auth.getCurrentUser().duz,
                patientId: id,
                action: 'view'
            };
            Audit.create(accessInfo).then(function(data) {
                console.log('Access Info:', data);
            })
            .catch(function(err) {
                console.log('Error filing access info: %s', err.message);
            });
        }

        function selectAllTemplate(){
            self.data.forEach(function(patient) {
                self.selectedTemplate[patient.id] = self.defaultTemplate;
            });
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
            .withOption('aaSorting', [
                [1, 'asc']
            ])
            // Active Responsive plugin
            .withOption('responsive', true);

        self.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
            .renderWith(function(data, type, full, meta) {
                self.selected[full.id] = false;
                return '<label for="selectchk' + data.id + '" style="display: none">select</label><input id="selectchk' + data.id + '" type="checkbox" ng-model="ctrl.selected[' + data.id + ']" ng-click="ctrl.toggleOne(ctrl.selected)">';
            }),
            DTColumnBuilder.newColumn(null).withTitle('Name').renderWith(function(data, type, full){
                return '<a href="_blank" ng-click="ctrl.patientClick($event)" data-id='+ data.id +'  class="nameLink">'+data.name+'</a>';
            }),
            DTColumnBuilder.newColumn('SSN').withTitle('SSN').renderWith(function(data, type, full) {
                return !angular.isUndefined(data) ? data.substr(0, 3) + '-' + data.substr(3, 2) + '-' + data.substr(5) : '';
            }),
            DTColumnBuilder.newColumn('DOB').withTitle('DOB'),
            DTColumnBuilder.newColumn('age').withTitle('Age'),
            DTColumnBuilder.newColumn('sex').withTitle('Gender'),
            DTColumnBuilder.newColumn(null).withTitle(templateHeaderHtml).notSortable()
            .renderWith(function(data, type, full, meta) {
                var teamplateSelect = '';
                teamplateSelect += '<select name="templateSelect" class="form-control" ';
                teamplateSelect += 'ng-model="ctrl.selectedTemplate[' + data.id + ']">';
                teamplateSelect += '<option ng-repeat="option in ctrl.templates" value="{{option.id}}">{{option.template_name}}</option></select>';
                return teamplateSelect;
            })
        ];

    });
