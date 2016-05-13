'use strict';

angular
    .module('tdpApp')
    .directive('customOnChange', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                var ctrl = scope.$eval(attrs.ctrl);
                element.bind('change', function (event) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(element.val());
                        ngModel.$render();
                    });
                    onChangeHandler.call(ctrl, event.target.files[0]);
                });
            }
        };
    });
