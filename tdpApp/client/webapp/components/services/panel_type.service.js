'use strict';

angular.module('tdpApp').factory('PanelType', function PanelType($http) {
    var defaultDetail = function(setting, detailValue) {
        var detaill = {
            panel_setting_id: setting.id,
            detail_value: detailValue,
            setting_type: setting.setting_type,
            setting_name: setting.setting_name,
            setting_value: setting.setting_value
        };
        return detaill;
    };

    var putDefaultDetails = function(panels) {
        panels.forEach(function(panel) {
            var settings = panel.panelSettings;
            if (settings && settings.length) {
                var panelDetails = [];
                settings.forEach(function(setting) {
                    switch (setting.setting_type) {
                        case 2:
                        case 3:
                        case 4:
                            if (setting.setting_value) {
                                panelDetails.push(defaultDetail(setting, setting.setting_value));
                            }
                            break;
                        case 5:
                        case 8:
                           if (setting.setting_value) {
                                var values = setting.setting_value.split('^');
                                values.forEach(function(value) {
                                    panelDetails.push(defaultDetail(setting, value));
                                });
                            }
                            break;
                        case 6:
                           if (setting.setting_value) {
                                var value = setting.setting_value.split(':')[0];
                                if (value) {
                                    panelDetails.push(defaultDetail(setting, value));
                                }
                            }
                            break;
                        default:
                    }
                });
                if (panelDetails && panelDetails.length) {
                    panel.panelDetails = panelDetails;
                }
            }
        });
        return panels;
    };

    return {
        /**
         * Find all panel types For facility
         *
         * @param  {Integer} facility id
         * @return {Promise}
         */
        findAllByFacilityID: function(id) {
            return $http.get('/api/panel_type/facility/' + id).then(function(response) {
                return response.data;
            }).then(putDefaultDetails);
        }
    };
});
