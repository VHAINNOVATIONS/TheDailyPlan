'use strict';

angular.module('tdpApp')
    .controller('SystemSettingsCtrl', function($q, $scope, $compile, FileReader, DTOptionsBuilder, DTColumnBuilder) {
        var self = this;

        var titleHtml = '<label for="selectchkall" style="display: none">select</label><input type="checkbox" id="selectchkall" ng-model="ctrl.selectAll" ng-click="ctrl.toggleAll(ctrl.selectAll, ctrl.selected)"> ';
        this.facilityMessages = ['Message 1 is good', 'Message 2 is good', 'Message 4 is good'];

        this.selectTab = function (index) {
            this.tabIndex = index;
            this.noResults = false;
            this.displayErr.flag = false;
        };

        //self.landingImage = '/common/assets/landing_images/landing' + self.landingImageIndex + '.jpg';


        this.tabIndex = 1;

        this.displayErr = {};
        this.data = [{
            name: 'landing1.jpg',
        }, {
            name: 'landing2.jpg',
        }, {
            name: 'landing3.jpg',
        }, {
            name: 'landing4.jpg',
        }];
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


        self.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                //return $resource('data1.json').query().$promise;
                return self.newPromise();
            })
            .withPaginationType('simple')
            .withOption('dom', 'tp')
            .withOption('ordering', false)
            // Active Responsive plugin
            .withOption('responsive', true);

        self.dtColumns = [
            DTColumnBuilder.newColumn('name').withTitle('Name'),
            DTColumnBuilder.newColumn('name').withTitle('Name')
        ];
    });

