/* copied from http://twofuckingdevelopers.com/2014/11/angularjs-virtual-list-directive-tutorial/ */

angular.module('tdpApp').directive('uiVirtualList', [function () {
    'use strict';
    return {
        restrict: 'E',
        require: 'ngModel',
        templateUrl: 'components/virtual-selection-list/vsl.html',
        scope: {
            uiDataProvider: '=',
            uiSelectedTop: '='
        },
        link: function (scope, elem) {
            var rowHeight = 30;

            scope.height = 200;
            scope.scrollTop = 0;
            scope.visibleProvider = [];
            scope.cellsPerPage = 0;
            scope.numberOfCells = 0;
            scope.canvasHeight = {};

            // Init
            scope.init = function () {
                elem[0].addEventListener('scroll', scope.onScroll);
                scope.cellsPerPage = Math.round(scope.height / rowHeight);
                scope.numberOfCells = 3 * scope.cellsPerPage;
                scope.canvasHeight = {
                    height: scope.uiDataProvider.length * rowHeight + 'px'
                };

                scope.updateDisplayList();
            };

            scope.updateDisplayListFromIndex = function (firstCell) {
                console.log(firstCell);
                var cellsToCreate = Math.min(firstCell + scope.numberOfCells, scope.numberOfCells);
                scope.visibleProvider = scope.uiDataProvider.slice(firstCell, firstCell + cellsToCreate);

                for (var i = 0; i < scope.visibleProvider.length; i++) {
                    scope.visibleProvider[i].styles = {
                        'top': ((firstCell + i) * rowHeight) + 'px'
                    };
                }
            };

            scope.updateDisplayList = function () {
                var firstCell = Math.max(Math.floor(scope.scrollTop / rowHeight) - scope.cellsPerPage, 0);
                scope.updateDisplayListFromIndex(firstCell);
            };

            scope.onScroll = function () {
                scope.scrollTop = elem.prop('scrollTop');
                scope.updateDisplayList();

                scope.$apply();
            };

            scope.$watch('uiSelectedTop', function(value) {
                if (typeof value === 'number') {
                    scope.scrollTop = rowHeight * value;
                    elem[0].scrollTop = rowHeight * value;
                    scope.updateDisplayListFromIndex(value);
                }
            });

            scope.init();
        }
    };
}]);
