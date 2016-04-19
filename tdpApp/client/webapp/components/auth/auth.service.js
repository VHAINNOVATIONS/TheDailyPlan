'use strict';

angular.module('tdpApp')
    .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
        var currentUser = {};
        /*if($cookieStore.get('tdptoken')) {
          currentUser = User.get();
        }*/

        return {
            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function(user) {
                return $http.post('/auth/local', user).then(function(response) {
                    var data = response.data;
                    console.log(data);
                    $cookieStore.put('tdptoken', data.token);
                    var serverUser = data.user;
                    currentUser.displayName = serverUser.displayName;
                    currentUser.keys = serverUser.keys;
                    currentUser.duz = serverUser.DUZ;
                });
            },

            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function() {
                $cookieStore.remove('tdptoken');
                currentUser = {};
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function(user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function(data) {
                        $cookieStore.put('tdptoken', data.token);
                        currentUser = User.get();
                        return cb(user);
                    },
                    function(err) {
                        this.logout();
                        return cb(err);
                    }.bind(this)).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function(oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.changePassword({
                    id: currentUser._id
                }, {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function(user) {
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function() {
                return currentUser;
            },

            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function() {
                return currentUser.hasOwnProperty('displayName');
            },

            /**
             * Waits for currentUser to resolve before checking if user is logged in
             */
            isLoggedInAsync: function(cb) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function() {
                        cb(true);
                    }).catch(function() {
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('displayName')) {
                    cb(true);
                } else {
                    cb(false);
                }
            },

            /**
             * Check if a user is an admin
             *
             * @return {Boolean}
             */
            isAdmin: function() {
                var keys = currentUser.keys;
                return keys && (keys.admin || keys.super);
            },

            /**
             * Get auth token
             */
            getToken: function() {
                return $cookieStore.get('tdptoken');
            }
        };
    });
