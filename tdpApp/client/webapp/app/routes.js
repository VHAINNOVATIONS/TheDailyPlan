'use strict';

angular.module('tdpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('init', {
        url: '/',
        templateUrl: 'app/account/login/login.html',
        resolve: { initCheck: initCheck }
      })
      /*.state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })*/
      /*.state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        resolve: { authenticate: authenticate }
      })*/
      /*.state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });*/
      .state('PatientSearch', {
       url: '/PatientSearch',
       templateUrl: 'app/patientSearch/patientSearch.html',
       resolve: { authenticate: authenticate }
      })
      .state('PatientPlan', {
       url: '/PatientPlan',
       templateUrl: 'app/patientPlan/patientPlan.html',
       resolve: { authenticate: authenticate }
      })
      .state('PDFView', {
       url: '/PDFView',
       templateUrl: 'app/pdfView/pdfView.html',
       resolve: { authenticate: authenticate }
      })
      .state('PDFDownload', {
       url: '/PDFDownload',
       templateUrl: 'app/pdfDownload/pdfDownload.html',
       resolve: { authenticate: authenticate }
      })
      .state('layouts', {
        url: '/layouts/:mode/:id',
        templateUrl: 'app/layouts/layouts.html',
        resolve: { authenticate: authenticate }
      })
      .state('templateSearch', {
        url: '/templateSearch',
        templateUrl: 'app/templateSearch/templateSearch.html',
        resolve: { authenticate: authenticate }
      })
      .state('systemSettings', {
        url: '/systemSettings',
        templateUrl: 'app/systemSettings/systemSettings.html',
        resolve: { authenticate: function() {return true;} }
      });

      function initCheck($q, Auth, $state, $timeout) {
      if (!Auth.isLoggedIn()) {

        // Resolve the promise successfully
        return $q.when();
      } else {
        // The next bit of code is asynchronously tricky.
        $timeout(function() {
          // This code runs after the authentication promise has been rejected.
          // Go to the log-in page
          $state.go('PatientSearch');
        });
        // Reject the authentication promise to prevent the state from loading
        return $q.reject();
      }
    }

    function authenticate($q, Auth, $state, $timeout) {
      if (Auth.isLoggedIn()) {

        // Resolve the promise successfully
        return $q.when();
      } else {
        // The next bit of code is asynchronously tricky.

        $timeout(function() {
          // This code runs after the authentication promise has been rejected.
          // Go to the log-in page
          $state.go('init');
        });

        // Reject the authentication promise to prevent the state from loading
        return $q.reject();
      }
    }
  });
