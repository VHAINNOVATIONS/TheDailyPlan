'use strict';

angular.module('tdpApp')
    .directive('embedsrc', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var current = element;
          scope.$watch(function() { return attrs.embedsrc; }, function () {
            var clone = element
                          .clone()
                          .attr('src', attrs.embedsrc);
            current.replaceWith(clone);
            current = clone;
          });
        }
      };
    });
