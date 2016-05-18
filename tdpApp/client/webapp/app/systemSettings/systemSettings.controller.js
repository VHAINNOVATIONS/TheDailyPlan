'use strict';

angular.module('tdpApp')
    .controller('SystemSettingsCtrl', function($q, $scope, $compile, FileReader, LandingImage, DTOptionsBuilder) {
        var self = this;

        this.facilityMessages = [{
            title: 'Message 1 is good',
            message: 'Message 1 is good'
        }, {
            title: 'Message 2 is good',
            message: 'Message 2 is good'
        }, {
            title: 'Message 3 is good',
            message: 'Message 3 is good'
        }];

        this.selectTab = function (index) {
            this.tabIndex = index;
            this.noResults = false;
        };

        this.tabIndex = 1;

        LandingImage.get().then(function(data) {
            self.data = data;
            self.original = _.cloneDeep(self.data);
            self.activeImg = data.reduce(function(r, d) {
                r[d.name] = d.active;
                return r;
            }, {});
        });

        this.dtInstance = {};
        this.selectedFile = null;
        this.existingFile = null;
        this.dirty = false;

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
            var img = _.find(this.data, {name: name});
            if (img) {
                var file = img.file;
                this.existingFile = name;
                this.selectedFile = null;
                if (file) {
                    FileReader.readAsDataUrl(file, $scope).then(function(result) {
                        $scope.imageSrc = result;
                    });
                } else {
                    $scope.imageSrc = img.path;
                }
            }
        };

        this.imgDelete = function(name) {
            var index = _.findIndex(this.data, {name: name});
            if (index > -1) {
                if (name === this.existingFile) {
                    this.existingFile = null;
                }
                this.data.splice(index, 1);
                this.dirty = true;
            }
        };

        this.activeClick = function() {
            this.dirty = true;
        };

        this.save = function() {
            this.dirty = false;
            var originalMap = _.indexBy(this.original, 'name');
            var stateData = this.data.reduce(function(r, d) {
                if (d.file) {
                    r.new.push(d);
                } else {
                    var original = originalMap[d.name];
                    if (original.active !== d.active) {
                        r.dirty.push(d);
                    }
                    r.calledFor[d.name] = true;
                }
                return r;
            }, {
                new: [],
                dirty: [],
                calledFor: {}
            });
            var formData = {};
            formData.files = _.map(stateData.new, 'file');
            formData.new = _.map(stateData.new, function(r) {
                return {
                    name: r.name,
                    active: r.active
                };
            });
            formData.dirty = stateData.dirty;
            formData.deleted = this.original.reduce(function(r, p) {
                var name = p.name;
                if (! stateData.calledFor[name]) {
                    r.push(name);
                }
                return r;
            }, []);
            LandingImage.save(formData).then(function() {
                self.displayMsg = 'Changes saved successfully';
            }).catch(function() {
                self.displayMsg = 'Error saving changes.';
            });
        };

        this.reset = function() {
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

