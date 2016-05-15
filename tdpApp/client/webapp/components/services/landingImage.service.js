'use strict';

angular.module('tdpApp')
    .factory('LandingImage', function Template($http) {
        return {
            getActive: function() {
                return $http.get('/api/landing_image/active').then(function(response) {
                    return response.data;
                });
            },
            get: function() {
                return $http.get('/api/landing_image').then(function(response) {
                    return response.data;
                });
            },
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
