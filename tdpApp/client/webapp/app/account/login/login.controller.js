'use strict';

angular.module('tdpApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, Facility, Facility_Message) {
    var self = this;
    self.user = {};
    self.errors = false;
    self.consent = {isselected: false};
    self.facilities = [];
    //self.facilitySelect = null;
    self.messageTabs = [];

    //functions
    self.init = init;
    self.init();

    $scope.login = function(form) {
      self.submitted = true;

      var keys = [{
        client: 'super',
        vista: 'TDPSUPER'
      }, {
        client: 'admin',
        vista: 'TDPADMIN'
      }];   // TODO read from  db when combobox for facility is functional

      var location;
      var selectedId = parseInt(self.facilitySelect, 10);
      if (selectedId !== 1) {
        self.facilities.forEach(function(facility) {
          if (facility.id === selectedId) {
            location = facility.name;
          }
        });
      }
      if(form.$valid && location) {
        Auth.login({
          verifyCode: self.user.verifyCode,
          accessCode: self.user.accessCode,
          userKeys: keys,
          location: location
        })
        .then( function(data) {
          // Logged in, redirect to home
          self.errors = false;
          $location.path('/PatientSearch');
        })
        .catch( function(err) {
          self.errors = true;
          console.log('login err:',self.errors);

        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    self.setFacility = function() {

      console.log('login setFacility',self.facilitySelect);
      // Populate the Message Tabs
      if (self.facilitySelect) {
        Facility_Message.findAllByFacilityID(self.facilitySelect)
        .then( function(data) {
          self.messageTabs = data;
        })
        .catch( function(err) {
          console.log('Facility Error:',err);
          self.errors = true;
        });
      }
    }

    function init() {

  // Initially Populate the Facilities
      Facility.findAll()
      .then( function(data) {
        self.facilities = data;
      })
      .then( function() {
        self.facilitySelect = '1';
        self.setFacility();
      })
      .catch( function(err) {
        console.log('Facility Error:',err);
        self.errors = true;
      });
      //setFacility();
    }
  });
