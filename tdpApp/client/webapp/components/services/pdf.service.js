'use strict';

angular.module('tdpApp')
    .factory('PDF', function PDF($http) {
        return {
            generate: function(selectedItems) {
                return $http.post('/api/pdf/generate', selectedItems);
            }
        };
    });
