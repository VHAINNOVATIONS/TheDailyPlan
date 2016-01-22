'use strict';

angular.module('tdpApp')
  .config(function ($stateProvider) {
    $stateProvider
      /*.state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })*/
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('PatientSearch', {
     url: '/PatientSearch',
     templateUrl: 'app/patientSearch/patientSearch.html'
      })
      .state('PatientPlan', {
     url: '/PatientPlan',
     templateUrl: 'app/patientPlan/patientPlan.html'
      })
  });
