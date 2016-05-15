'use strict';

angular.module('tdpApp')
    .controller('SystemSettingsCtrl', function($q, $scope, $compile, FileReader, LandingImage, DTOptionsBuilder) {
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
        this.original = _.cloneDeep(this.data);
        this.dtInstance = {};
        this.selectedFile = null;
        this.existingFile = null;
        this.dirty = false;
        this.activeImg = this.data.reduce(function(r, d) {
            r[d.name] = d.active;
            return r;
        }, {});

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
                this.dirty = true;
            }
        };

        this.imgClick = function(name) {
            var img = this.activeImg[name];
            if (img) {
                var file = img.file;
                this.existingFile = name;
                this.selectedFile = null;
                if (file) {
                    FileReader.readAsDataUrl(file, $scope).then(function(result) {
                        $scope.imageSrc = result;
                    });
                } else {
                    $scope.imageSrc = '/common/assets/landing_images/' + name;
                }
            }
        };

        this.imgDelete = function(name) {
            if (name === this.existingFile) {
                this.existingFile = null;
            }
            var index = _.findIndex(this.data, {name: name});
            if (index > -1) {
                this.data.splice(index, 1);
                this.dirty = true;
            }
        };

        this.activeClick = function() {
            this.dirty = true;
        };

        this.save = function() {
            this.dirty = false;
            var selectedFile = _.find(this.data, function(d) {
                return d.file;
            });
            LandingImage.save({}, selectedFile).then(function() {
                console.log('success');
            }).catch(function(err) {
                console.log(err);
            });
        };

        this.restore = function() {
            this.data.length = 0;
            this.original.forEach(function(r) {
                this.data.push(_.clone(r));
            }, this);
            this.dirty = false;
        };

        self.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('simple')
            .withOption('dom', 'tip')
            .withOption('ordering', false)
            .withOption('pageLength', 4)
            .withOption('responsive', true);
    });

