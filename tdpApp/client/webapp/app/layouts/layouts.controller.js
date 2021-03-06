'use strict';

angular.module('tdpApp')
    .controller('LayoutsCtrl', ['$scope', '$location', 'Template', 'PanelType', 'Location', '$modal', 'Facility', '$stateParams',
        function($scope, $location, Template, PanelType, Location, $modal, Facility, $stateParams) {
            var self = this;
            self.errors = {};
            self.currentFacility = Facility.getCurrentFacility();
            self.selectedA = [];
            self.selectedS = [];
            self.selectedPanels = [];
            self.masterPanelsList = [];
            self.availablePanels = [];
            self.submitButton = '';
            self.locationId = '';

            //functions
            function reset() {
                self.selectedA = [];
                self.selectedS = [];
                self.checkedA = false;
                self.checkedS = false;
            }

            self.mode = $stateParams.mode;
            self.displayOnly = false;
            self.templateID = $stateParams.id;

            var initializeLayout = PanelType.findAllByFacilityID(self.currentFacility).then(function(panel_types) {
                    reset();
                    self.masterPanelsList = panel_types;
                    for (var i = 0; i < panel_types.length; i++) {
                        if (panel_types[i].mandatory) {
                            self.selectedPanels.push(panel_types[i]);
                        } else {
                            self.availablePanels.push(panel_types[i]);
                        }
                    }
                }).then(function() {
                    return Location.getWards().then(function(wards) {
                        self.wards = wards.map(function(ward) {
                            return {
                                id: ward.id.toString() + '^1',
                                name: ward.name + ' (Ward)'
                            };
                        });
                    });
                }).then(function() {
                    return Location.getClinics().then( function(clinics) {
                        clinics = clinics.map(function(clinic) {
                            return {
                                id: clinic.id.toString() + '^2',
                                name: clinic.name + ' (Clinic)'
                            };
                        });
                        self.wards = self.wards.concat(clinics);
                    });
                });

            function arrayObjectIndexOf(myArray, searchTerm, property) {
                for (var i = 0, len = myArray.length; i < len; i++) {
                    if (myArray[i][property] === searchTerm) {
                        return i;
                    }
                }
                return -1;
            }

            var loadTemplate = function(id) {
                initializeLayout.then(function() {
                    return Template.findByID(id);
                }).then(function(template) {
                    self.template = template;
                    self.locationId = template.location_id ? template.location_id.toString() + (template.location_type === 2 ? '^2' : '^1') : '';
                    return Template.findCompleteByID(id).then(function(templateLayout) {
                        //self.template.panels = templateLayout;
                        self.selectedPanels = templateLayout;
                        for (var i = 0; i < templateLayout.length; i++) {
                            var delId = arrayObjectIndexOf(self.availablePanels, templateLayout[i].id, 'id');
                            if (delId !== -1) {
                                self.availablePanels.splice(delId, 1);
                            }
                        }
                    });
                }).catch(function(err) {
                    self.errors.other = err.message;
                });
            };

            switch (self.mode) {
                case 'create':
                    self.submitButton = 'Save';
                    self.topTitle = 'New Template';
                    initializeLayout.catch(function(err) {
                        self.errors.other = err.message;
                    });
                    break;
                case 'edit':
                    self.submitButton = 'Update';
                    self.topTitle = 'Edit Template';
                    loadTemplate(self.templateID);
                    break;
                case 'delete':
                    self.submitButton = 'Delete';
                    self.topTitle = 'Delete Template';
                    loadTemplate(self.templateID);
                    break;
                case 'display':
                    self.displayOnly = true;
                    self.submitButton = 'Done';
                    self.topTitle = 'Display Template (Read Only)';
                    loadTemplate(self.templateID);
                    break;
                default:
                    // set error and send back to templateSearch
                    self.cancelTemplate();
                    break;
            }

            function move(array, from, to) {
                if (to === from) {
                    return;
                }
                var target = array[from];
                var increment = to < from ? -1 : 1;

                for (var k = from; k !== to; k += increment) {
                    array[k] = array[k + increment];
                }
                array[to] = target;
            }

            var updateLocationInfo = function(template, locationInfo) {
                var r = locationInfo.split('^');
                template.location_id = parseInt(r[0], 10);
                template.location_type = parseInt(r[1], 10);
            };

            self.processTemplate = function(form) {
                self.submitted = true;
                self.template.panels = self.selectedPanels;

                if (form.$valid) {
                    switch (self.mode) {
                        case 'create':
                            if (self.locationId) {
                                updateLocationInfo(self.template, self.locationId);
                            }
                            Template.create(self.template)
                                .then(function() {
                                    $location.path('/templateSearch');
                                    return;
                                })
                                .catch(function(err) {
                                    self.errors.other = err;
                                });
                            break;
                        case 'edit':
                            self.template.id = self.templateID;
                            if (self.locationId) {
                                updateLocationInfo(self.template, self.locationId);
                            } else {
                                self.template.location_id = null;
                                self.template.location_type = null;
                            }
                            Template.update(self.template)
                                .then(function() {
                                    $location.path('/templateSearch');
                                    return;
                                })
                                .catch(function(err) {
                                    self.errors.other = err;
                                });
                            break;
                        case 'display':
                            $location.path('/templateSearch');
                            break;
                        case 'delete':
                            Template.delete(self.template.id)
                                .then(function() {
                                    $location.path('/templateSearch');
                                    return;
                                })
                                .catch(function(err) {
                                    self.errors.other = err;
                                });
                            break;
                        default:
                            // set error and send back to templateSearch
                            self.cancelTemplate();
                            break;
                    }
                }
            };

            self.startEditTemplate = function() {
                self.displayOnly = false;
                self.submitButton = 'Update';
                self.topTitle = 'Edit Template';
                self.mode = 'edit';
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
                    self.availablePanels.splice(delId, 1);
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
                        self.selectedPanels.splice(delId, 1);
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
                        move(self.selectedPanels, upId, upId - 1);
                    }
                }
            };

            self.moveDown = function() {
                for (var i in self.selectedS) {
                    var downId = arrayObjectIndexOf(self.selectedPanels, self.selectedS[i], 'id');
                    if (downId >= self.selectedPanels.length - 1) {
                        reset();
                    } else {
                        move(self.selectedPanels, downId, downId + 1);
                    }
                }
            };

            self.toggleA = function() {
                if (!self.checkedA) {
                    self.selectedA = [];
                } else {
                    for (var i in self.availablePanels) {
                        if (self.selectedA.indexOf(self.availablePanels[i].id) === -1) {
                            self.selectedA.push(self.availablePanels[i].id);
                        }
                    }
                }
            };

            self.toggleS = function() {
                if (!self.checkedS) {
                    self.selectedS = [];
                } else {
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
                    self.selectedA.splice(self.selectedA.indexOf(i), 1);
                    if (self.checkedA) {
                      self.checkedA = false;
                    }
                }
            };

            self.selectS = function(i) {
                if (self.selectedS.indexOf(i) === -1) {
                    self.selectedS.push(i);
                } else {
                    self.selectedS.splice(self.selectedS.indexOf(i), 1);
                    if (self.checkedS) {
                        self.checkedS = false;
                    }
                }
            };

            self.openSettings = function(panel) {
                $modal.open({
                    scope: $scope,
                    templateUrl: 'app/layouts/customizer.html',
                    controller: 'CustomizerCtrl',
                    resolve: {
                        params: function() {
                            return {
                              panel: panel,
                              displayOnly: self.displayOnly,

                            };
                        }
                    }
                });
            };
        }
    ]);
