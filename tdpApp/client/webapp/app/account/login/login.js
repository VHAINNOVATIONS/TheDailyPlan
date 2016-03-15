'use strict';

angular.module('tdpApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('init', {
                url: '/',
                templateUrl: 'app/account/login/login.html'
            });
    });
