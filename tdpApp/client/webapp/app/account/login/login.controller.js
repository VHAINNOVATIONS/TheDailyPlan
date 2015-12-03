'use strict';

angular.module('starterApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          verifyCode: $scope.user.verifyCode,
          accessCode: $scope.user.accessCode
        })
        .then( function(data) {
          // Logged in, redirect to home
          console.log("login data:",data);
          $location.path('/PatientSearch/PatientSearch');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
