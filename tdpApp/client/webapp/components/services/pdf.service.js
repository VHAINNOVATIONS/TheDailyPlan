/* global moment*/
'use strict';

angular.module('tdpApp')
    .factory('PDF', function PDF($http, Facility,Auth) {
        return {
            generate: function(selectedItems) {
                var m = moment();
                var options = {
                    date: m.format('MM/DD/YYYY'),
                    time: m.format('HH:mm'),
                    facility: Facility.getCurrentFacilityName(),
                    userId: Auth.getCurrentUser().duz
                };
                return $http.post('/api/pdf/generate', {
                    selected: selectedItems,
                    options: options
                });
            },
            getPdfList: function(){
                var userId = Auth.getCurrentUser().duz;
                return $http.get('/api/pdf/getPdfList/'+ userId);
            }
        };
    });
