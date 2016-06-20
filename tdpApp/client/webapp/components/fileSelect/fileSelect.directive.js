'use strict';

angular
    .module('tdpApp')
    .directive('fileSelect', function () {
        return {
            link: function($scope,  element, attrs) {
                var onChangeHandler = $scope.$eval(attrs.onFileChange);
                var ctrl = $scope.$eval(attrs.ctrl);
                element.bind('change', function(event) {
                    var file = (event.srcElement || event.target).files[0];
                    onChangeHandler.call(ctrl, file);
                });
            }
        };
    });
