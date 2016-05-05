'use strict';

angular.module('tdpApp')
    .controller('LoginCtrl', function($rootScope, $scope, Auth, $location, $window, $modal, $log, $interval, Facility, Idle, LogonFacility) {
        var self = this;
        self.user = {};
        self.errors = false;
        self.consent = {
            isselected: false
        };
        self.facilities = [];
        //self.facilitySelect = null;
        self.messageTabs = [];

        self.landingImage = '/common/assets/landing_images/landing1.jpg';
        self.landingImageIndex = 1;
        $interval(function() {
            ++self.landingImageIndex;
            if (self.landingImageIndex === 5) {
                self.landingImageIndex = 1;
            }
            self.landingImage = '/common/assets/landing_images/landing' + self.landingImageIndex + '.jpg';
        }, 5000);

        self.init = function init() {
            // Initially Populate the Facilities
            Facility.findAll().then(function(data) {
                self.facilities = data;
                var logonFacility = LogonFacility.get();
                var facilityId = '1';
                if (logonFacility) {
                    data.some(function(facility) {
                        if (facility.name.toLowerCase() === logonFacility) {
                            facilityId = facility.id.toString();
                            return true;
                        }
                        return false;
                    });
                }
                return facilityId;
            }).then(function(facilityId) {
                self.facilitySelect = facilityId;
                self.setFacility();
            })
            .catch(function(err) {
                $log.debug('Facility Error:', err);
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
            $log.debug('IdleStart');
            closeTimeout();

            $scope.timeout = $modal.open({
                templateUrl: 'app/account/login/timeout.html',
                windowClass: 'modal-danger'
            });
        });

        $rootScope.$on('IdleEnd', function() {
            $log.debug('IdleEnd');
            closeTimeout();
        });

        $rootScope.$on('IdleTimeout', function() {
            $log.debug('IdleTimeout');
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
                        $log.debug('login err:', self.errors);
                    });
            }
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };

        self.setFacility = function() {
            $log.debug('login setFacility', self.facilitySelect);
            // Populate the Message Tabs
            if (self.facilitySelect) {
                Facility.setCurrentFacility(self.facilitySelect);
                Facility.getLandingPageInformation(self.facilitySelect).then(function(data) {
                    self.messageTabs = data.messages;
                    self.contact = data.contact;
                }).catch(function(err) {
                    $log.debug('Facility Error:', err);
                    self.errors = true;
                });
            }
        };
    });
