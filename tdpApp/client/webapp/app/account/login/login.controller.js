'use strict';

angular.module('tdpApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    var self = this;
    self.user = {};
    self.errors = false;
    self.consent = {isselected: false};

    self.facilities = {
      facilitySelect: null,
      availableOptions: [
        {id: '520', name: '520 - Biloxi'},
        {id: '607', name: '607 - Madison'},
        {id: '618', name: '618 - Minneapolis'},
        {id: '674', name: '674 - Central Texas (Waco)'}
      ],
    };

    self.tabs = [
      {
        isOpen: true,
        title: 'VA Makes Changes to Veterans Choice Program ',
        content: 'The Department of Veterans Affairs today announced a number of changes to make participation in the Veterans Choice Program easier and more convenient for Veterans who need to use it. The move, which streamlines eligibility requirements, follows feedback from Veterans along with organizations working on their behalf.'
      },
      {
        isOpen: false,
        title: 'VA To Hold 2015 Small Business Engagement in Pittsburgh',
        content: 'The Department of Veterans Affairs in collaboration with other federal agencies and partners, will sponsor the 5th annual National Veterans Small Business Engagement, November 17–19, 2015, at the David L. Lawrence Convention Center in Pittsburgh, PA.'
      },
      {
        isOpen: false,
        title: 'VA Secretary to Announce VA-Bob Woodruff Foundation Partnership',
        content: 'Department of Veterans Affairs’ Secretary Robert A. McDonald this evening will announce a partnership with the Bob Woodruff Foundation to further advance VA’s outreach to Veterans through deeper and more innovative local and community partnerships. VA will capitalize on BWF’s strength and contacts to find unique ways to connect Veterans, transitioning Servicemembers and their families with resources right where they live.'
      }
    ];

    $scope.login = function(form) {
      self.submitted = true;

      if(form.$valid) {
        Auth.login({
          verifyCode: self.user.verifyCode,
          accessCode: self.user.accessCode
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
  });
