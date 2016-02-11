'use strict';

angular.module('tdpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('templateSearch', {
        url: '/templateSearch',
        templateUrl: 'app/templateSearch/templateSearch.html'
      });
  });
