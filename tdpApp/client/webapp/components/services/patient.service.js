'use strict';

angular.module('tdpApp')
    .factory('Patient', function Patient($location, $rootScope, $http, $q) {
        var results = {};
        var selectedPatients = [];
        var selectedPrintPatients = [];
        var selectedPrintPanels = [];
        var pdfFilepath;

        return {

            /**
             * Search All Patients
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            searchAll: function(value, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/patient/' + value).
                success(function(data) {
                    console.log('PatientSearch:', data);
                    results = data;
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {

                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },
            getSelectedPatients: function() {
                return selectedPatients;
            },
            setSelectedPatients: function(value) {
                selectedPatients = value;
            },

            getPrintPatients: function() {
                return selectedPrintPatients;
            },
            setPrintPatients: function(value) {
                selectedPrintPatients = value;
            },
            getPrintPanels: function() {
                return selectedPrintPanels;
            },
            setPrintPanels: function(value) {
                selectedPrintPanels = value;
            },
            setPDFFilepath: function(filepath) {
                pdfFilepath = filepath;
            },
            getPDFFilepath: function() {
                return pdfFilepath;
            },

            /**
             * Search Patients By Clinic
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            byClinic: function(value, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/patient/byClinic/' + value).
                success(function(data) {
                    console.log('PatientByClinic:', data);
                    results = data;
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {

                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },

            /**
             * Search Patients By Clinic
             *
             * @param  {String}   value    - query value
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            byWard: function(value, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/patient/byWard/' + value).
                success(function(data) {
                    console.log('PatientByWard:', data);
                    results = data;
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {

                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            }

        };
    });
