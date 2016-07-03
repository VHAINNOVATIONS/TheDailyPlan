'use strict';

angular.module('tdpApp')
    .controller('CustomizerCtrl', ['$scope', '$uibModalInstance', 'params', 'PanelSetting',
        function($scope, $uibModalInstance, params, PanelSetting) {
            var panel = params.panel;
            $scope.panel = panel;
            $scope.options = [];
            $scope.displayOnly = !!params.displayOnly;

            PanelSetting.findByPanelTypeID(panel.id)
                .then(function(panel_settings) {
                    $scope.settings = panel_settings;
                    var settingIdMap = panel_settings.reduce(function(r, ps) {
                        r[ps.panelSettingID] = {
                            type: ps.settingType,
                            obj: ps
                        };
                        return r;
                    }, {});
                    if (panel.panelDetails) {
                        for (var i = 0; i < panel.panelDetails.length; i++) {
                            var pid = panel.panelDetails[i].panel_setting_id;
                            if (settingIdMap[pid].type === 2) {
                                var valueType2 = panel.panelDetails[i].detail_value;
                                if (typeof valueType2 === 'string') {
                                    valueType2 = parseInt(valueType2, 10);
                                }
                                settingIdMap[pid].obj.numberValue = valueType2;
                            }
                            if (settingIdMap[pid].type === 3 || settingIdMap[pid].type === 4) {
                                settingIdMap[pid].obj.textValue = panel.panelDetails[i].detail_value || '';
                            }
                            if (settingIdMap[pid].type === 5) {
                                if (! settingIdMap[pid].obj.listValues) {
                                    settingIdMap[pid].obj.listValues = [panel.panelDetails[i].detail_value];
                                } else {
                                    settingIdMap[pid].obj.listValues.push(panel.panelDetails[i].detail_value);
                                }
                            }
                            if (settingIdMap[pid].type === 6) {
                                settingIdMap[pid].obj.textValue = panel.panelDetails[i].detail_value;
                            }
                            if (settingIdMap[pid].type === 7) {
                                settingIdMap[pid].obj.isChecked = panel.panelDetails[i].detail_value === '1';
                            }
                        }
                    }
                    panel_settings.forEach(function(ps) {
                        if (ps.settingType === 6) {
                            var settingValue = ps.settingValue;
                            if (settingValue) {
                                var pieces = settingValue.split(':');
                                if (pieces[1]) {
                                    ps.possibleValues = pieces[1].split('^');
                                }
                            }
                        }
                    });
                })
                .catch(function(err) {
                    $scope.errors = err.message;
                });

            $scope.dismiss = function() {
                $uibModalInstance.dismiss();
            };

            $scope.submit = function() {
                console.log('CustomizerCtrl - panelSave:', panel);
                var panelDetails = [];
                $scope.settings.forEach(function(ps) {
                    var detail;
                    var settingId = ps.panelSettingID;
                    if (ps.settingType === 2) {
                        detail = {
                            panel_setting_id: settingId,
                            detail_value: ps.numberValue.toString()
                        };
                        panelDetails.push(detail);
                    }
                    if (ps.settingType === 3 || ps.settingType === 4) {
                        detail = {
                            panel_setting_id: settingId,
                            detail_value: ps.textValue
                        };
                        panelDetails.push(detail);
                    }
                    if ((ps.settingType === 5) && ps.listValues) {
                        ps.listValues.forEach(function(listValue) {
                            detail = {
                                panel_setting_id: settingId,
                                detail_value: listValue
                            };
                            panelDetails.push(detail);
                        });
                    }
                    if (ps.settingType === 6) {
                        detail = {
                            panel_setting_id: settingId,
                            detail_value: ps.textValue
                        };
                        panelDetails.push(detail);
                    }
                    if (ps.settingType === 7) {
                        detail = {
                            panel_setting_id: settingId,
                            detail_value: ps.isChecked === true ? '1' : '0'
                        };
                        panelDetails.push(detail);
                    }
                });
                if (panelDetails.length) {
                    $scope.panel.panelDetails = panelDetails;
                }
                angular.extend(panel, $scope.panel);

                $uibModalInstance.close(panel);
            };
        }
    ]);
