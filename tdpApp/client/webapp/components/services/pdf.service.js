/* global moment*/
'use strict';

angular.module('tdpApp')
    .factory('PDF', function PDF($http) {
        return {
            generate: function(selectedItems) {
                var m = moment();
                var options = {
                    date: m.format('MM/DD/YYYY'),
                    time: m.format('HH:mm')
                };
                return $http.post('/api/pdf/generate', {
                    selected: selectedItems,
                    options: options
                });
            }
        };
    });
