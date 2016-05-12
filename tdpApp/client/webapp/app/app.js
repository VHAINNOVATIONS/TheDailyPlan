'use strict';

angular.module('tdpApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngIdle',
  'ui.router',
  'gridster',
  'ui.bootstrap',
  'datatables',
  'ngTouch',
  'ui.grid',
  'ui.grid.expandable',
  'ui.grid.selection',
  'ui.grid.pinning',
  'ui.grid.autoResize'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IdleProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    IdleProvider.idle(300);
    IdleProvider.timeout(20);
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('tdptoken')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('tdptoken');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          $cookieStore.remove('tdptoken');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, LogonFacility) {
    var path = $location.path();
    var pieces = path.split('/');
    if ((pieces.length > 2) && (pieces[1] === 'facility')) {
        LogonFacility.set(pieces[2]);
    }

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/');
        }
      });
    });
  });
