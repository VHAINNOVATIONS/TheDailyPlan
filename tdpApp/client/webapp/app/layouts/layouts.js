'use strict';

angular.module('tdpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('layouts', {
        url: '/layouts/:mode/:id',
        templateUrl: 'app/layouts/layouts.html'
      });
  });
