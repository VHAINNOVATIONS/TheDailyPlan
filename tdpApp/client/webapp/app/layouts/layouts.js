'use strict';

angular.module('tdpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('layouts', {
        url: '/layouts',
        templateUrl: 'app/layouts/layouts.html'
      });
  });
