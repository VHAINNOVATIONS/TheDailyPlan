'use strict';

angular.module('tdpApp')
    .factory('PanelSetting', function PanelSetting($http) {
        return {
            /**
             * Find complete panel settings by panel type
             *
             * @param  {String}   id    - panel type id
             * @return {Promise}
             */
            findByPanelTypeID: function(id) {
                return $http.get('/api/panel_setting/byPanelType/' + id).then(function(response) {
                    return response.data;
                });
            },
        };
    });
