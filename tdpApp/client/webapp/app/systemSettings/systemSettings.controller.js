'use strict';

angular.module('tdpApp')
    .controller('SystemSettingsCtrl', function($q, $scope, $compile, FileReader, DTOptionsBuilder, DTColumnBuilder) {
        var self = this;

        this.facilityMessages = ['Message 1 is good', 'Message 2 is good', 'Message 4 is good'];

        this.selectTab = function (index) {
            this.tabIndex = index;
            this.noResults = false;
            this.displayErr.flag = false;
        };

        this.tabIndex = 1;

        this.displayErr = {};
        this.data = [{
            name: 'landing1.jpg',
            active: true
        }, {
            name: 'landing8.jpg',
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

        this.dtInstance = {};
        this.selectedFile = null;
        this.existingFile = null;
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

        this.uniqifyImageName = function(name) {
            var index = 1;
            var pieces = name.split('.');
            var original = pieces[0];
            while (this.activeImg.hasOwnProperty('name')) {
                pieces[0] = original + index;
                name = pieces.join('.');
                ++index;
            }
            return name;
        };

        this.addImage = function() {
            if (this.selectedFile) {
                var name = this.selectedFile.name;
                if (this.activeImg.hasOwnProperty('name')) {
                    name = this.uniqifyImageName(name);
                }
                var fileData = {
                    name: name,
                    active: true,
                    file: this.selectedFile
                };
                this.existingFile = name;
                this.selectedFile = null;
                this.data.unshift(fileData);
                this.activeImg[name] = true;
                var dtInstance = this.dtInstance;
                dtInstance.reloadData(function() {}, true);
            }
        };

        this.imgClick = function(name) {
            this.existingFile = name;
            this.selectedFile = null;
            $scope.imageSrc = '/common/assets/landing_images/' + name;
        };

        this.imgDelete = function(name) {
            if (name === this.existingFile) {
                this.existingFile = null;
            }
            var index = _.findIndex(this.data, {name: name});
            if (index > -1) {
                this.data.splice(index, 1);
                this.dtInstance.reloadData(function() {}, true);
            }
        };

        self.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
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
            .withOption('responsive', true);

        self.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle('Name').renderWith(function(data){
                return '<span ng-click="ctrl.imgClick(\'' + data.name + '\')"  class="nameLink clickable">'+data.name+'</span>';
            }),
            DTColumnBuilder.newColumn(null).withTitle('Active')
            .renderWith(function(data) {
                return '<label for="selectchk' + data.name + '" style="display: none">active</label><input id="selectchk' + data.name + '" type="checkbox" ng-model="ctrl.activeImg[\'' + data.name + '\']" ng-click="ctrl.toggleActiveImg(' + data.name + ')">';
            }),
            DTColumnBuilder.newColumn(null).renderWith(function(data){
                return '<span ng-click="ctrl.imgDelete(\'' + data.name + '\')"  class="nameLink clickable">'+'Delete'+'</span>';
            }),
        ];
    });

