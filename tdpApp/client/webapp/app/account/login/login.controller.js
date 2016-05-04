'use strict';

angular.module('tdpApp')
    .controller('LoginCtrl', function($rootScope, $scope, Auth, $location, $window, $modal, Facility, Facility_Message, Idle) {
        var self = this;
        self.user = {};
        self.errors = false;
        self.consent = {
            isselected: false
        };
        self.facilities = [];
        //self.facilitySelect = null;
        self.messageTabs = [];

        self.init = function init() {
            // Initially Populate the Facilities
            Facility.findAll()
                .then(function(data) {
                    self.facilities = data;
                })
                .then(function() {
                    self.facilitySelect = '1';
                    self.setFacility();
                })
                .catch(function(err) {
                    console.log('Facility Error:', err);
                    self.errors = true;
                });
        };
        self.init();

        function closeTimeout() {
            if ($scope.timeout) {
                $scope.timeout.close();
                $scope.timeout = null;
            }
        }

        $rootScope.$on('IdleStart', function() {
            console.log('IdleStart');
            closeTimeout();

            $scope.timeout = $modal.open({
                templateUrl: 'app/account/login/timeout.html',
                windowClass: 'modal-danger'
            });
        });

        $rootScope.$on('IdleEnd', function() {
            console.log('IdleEnd');
            closeTimeout();
        });

        $rootScope.$on('IdleTimeout', function() {
            console.log('IdleTimeout');
            closeTimeout();
            Idle.unwatch();
            Auth.logout();
            $location.path('/');
        });

        $scope.login = function(form) {
            self.submitted = true;

            var keys = [{
                client: 'super',
                vista: 'TDPSUPER'
            }, {
                client: 'admin',
                vista: 'TDPADMIN'
            }]; // TODO read from  db when combobox for facility is functional

            var location;
            var selectedId = parseInt(self.facilitySelect, 10);
            if (selectedId !== 1) {
                self.facilities.forEach(function(facility) {
                    if (facility.id === selectedId) {
                        location = facility.name;
                    }
                });
            }
            if (form.$valid && location) {
                Auth.login({
                        verifyCode: self.user.verifyCode,
                        accessCode: self.user.accessCode,
                        userKeys: keys,
                        location: location
                    })
                    .then(function() {
                        // Logged in, redirect to home
                        self.errors = false;
                        Idle.watch();
                        $location.path('/PatientSearch');
                    })
                    .catch(function() {
                        self.errors = true;
                        console.log('login err:', self.errors);
                    });
            }
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };

        self.setFacility = function() {

            console.log('login setFacility', self.facilitySelect);
            // Populate the Message Tabs
            if (self.facilitySelect) {
                Facility.setCurrentFacility(self.facilitySelect);

                Facility_Message.findAllByFacilityID(self.facilitySelect)
                    .then(function(data) {
                        self.messageTabs = data;
                    })
                    .catch(function(err) {
                        console.log('Facility Error:', err);
                        self.errors = true;
                    });
            }
        };
    });
