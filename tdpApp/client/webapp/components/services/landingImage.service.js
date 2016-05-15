'use strict';

angular.module('tdpApp')
    .factory('LandingImage', function Template($http) {
        return {
            save: function(images, file) {
                var fd = new FormData();
                fd.append('file', file.file);
                return $http.post('/api/landing_image', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function (response) {
                    return response.data;
                });
            }
        };
    });
