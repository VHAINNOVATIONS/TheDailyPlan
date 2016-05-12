/* global moment*/
'use strict';

angular.module('tdpApp')
    .factory('PDF', function PDF($http, Facility) {
        return {
            generate: function(selectedItems) {
                var m = moment();
                var options = {
                    date: m.format('MM/DD/YYYY'),
                    time: m.format('HH:mm'),
                    facility: Facility.getCurrentFacilityName()
                };
                return $http.post('/api/pdf/generate', {
                    selected: selectedItems,
                    options: options
                });
            }
        };
    });
