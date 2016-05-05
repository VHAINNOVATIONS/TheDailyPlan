'use strict';

angular.module('tdpApp')
    .factory('LogonFacility', function LogonFacility() {
        var logonFacility = null;

        return {
            /**
             * Set logon facility
             *
             * @param  {String}   facility - login info
             */
            set: function(facility) {
                logonFacility = facility && facility.toLowerCase();
            },

            /**
             * Get logon facility
             */
            get: function() {
                return logonFacility;
            }
        };
    });
