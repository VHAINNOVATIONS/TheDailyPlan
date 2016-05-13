'use strict';

angular.module('tdpApp')
    .controller('SystemSettingsCtrl', function($q, $scope, FileReader, DTOptionsBuilder, DTColumnBuilder) {
        var self = this;

        this.facilityMessages = ['Message 1 is good', 'Message 2 is good', 'Message 4 is good'];

        this.clearAlerts = function () {
            this.noResults = false;
            this.displayErr.flag = false;
        };

        this.displayErr = {};
        this.data = [];
        this.selectedFile = null;

        this.newPromise = function () {
            return $q.resolve(this.data);
        };

        self.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return self.newPromise();
            })
            .withOption('responsive', true); // Active Responsive plugin

        self.dtColumns = [
            DTColumnBuilder.newColumn('filename').withTitle('Name'),
        ];

        this.onFileChange = function (file) {
            FileReader.readAsDataUrl(file, $scope).then(function(result) {
                $scope.imageSrc = result;
                self.selectedFile = file;
            });
        };

        this.addImage = function() {
            this.selectedFile = null;
        };
    });

