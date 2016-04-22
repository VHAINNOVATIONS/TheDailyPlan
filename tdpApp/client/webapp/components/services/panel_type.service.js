'use strict';

angular.module('tdpApp')
    .factory('PanelType', function PanelType($http) {
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
                });
            }
        };
    });
