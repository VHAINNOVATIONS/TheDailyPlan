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
            active: true
        }, {
            name: 'landing2.jpg',
            active: false
        }, {
            name: 'landing3.jpg',
            active: false
        }, {
            name: 'landing4.jpg',
            active: true
        }, {
            name: 'landing5.jpg',
            active: false
        }, {
            name: 'landing6.jpg',
            active: true
        }];
        this.selectedFile = null;
        this.activeImg = this.data.reduce(function(r, d) {
            r[d.name] = d.active;
            return r;
        }, {});


        this.newPromise = function () {
            return $q.resolve(this.data);
        };

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
            .withOption('createdRow', function(row) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            })
            .withPaginationType('simple')
            .withOption('dom', 'tip')
            .withOption('ordering', false)
            .withOption('pageLength', 4)
            //.withOption('scrollCollapse', true)
            //.withOption('scrollY', '180px')
            // Active Responsive plugin
            .withOption('responsive', true);

        self.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle('Name').renderWith(function(data){
                return '<a href="_blank" ng-click="ctrl.imgClick(' + data.name + ')"  class="nameLink">'+data.name+'</a>';
            }),
            DTColumnBuilder.newColumn(null).withTitle('Active')
            .renderWith(function(data) {
                return '<label for="selectchk' + data.name + '" style="display: none">active</label><input id="selectchk' + data.name + '" type="checkbox" ng-model="ctrl.activeImg[\'' + data.name + '\']" ng-click="ctrl.toggleActiveImg(' + data.name + ')">';
            }),
            DTColumnBuilder.newColumn(null).renderWith(function(data){
                return '<a href="_blank" ng-click="ctrl.imgDelete(' + data.name + ')"  class="nameLink">'+'Delete'+'</a>';
            }),
        ];
    });

