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
            save: function(formData) {
                var fd = new FormData();
                ['new', 'deleted', 'dirty'].forEach(function(key) {
                    fd.append(key, JSON.stringify(formData[key]));
                });
                formData.files.forEach(function(file) {
                    fd.append('files', file);
                });
                return $http.post('/fu/landing_image', fd, {
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
