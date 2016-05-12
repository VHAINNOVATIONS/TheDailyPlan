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
                var selectFacility = data[0];
                if (logonFacility) {
                    data.some(function(facility) {
                        if (facility.name.toLowerCase() === logonFacility) {
                            selectFacility = facility;
                            return true;
                        }
                        return false;
                    });
                }
                return selectFacility;
            }).then(function(facility) {
                self.facilitySelect = facility;
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
            }];

            var location;
            var selectedId = self.facilitySelect && self.facilitySelect.id;
            if (selectedId && (selectedId !== 1)) {
                location = self.facilitySelect.name;
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
                Facility.setCurrentFacility(self.facilitySelect.id, self.facilitySelect.name);
                Facility.getLandingPageInformation(self.facilitySelect.id).then(function(data) {
                    self.messageTabs = data.messages;
                    self.contact = data.contact;
                }).catch(function(err) {
                    $log.debug('Facility Error:', err);
                    self.errors = true;
                });
            }
        };
    });
