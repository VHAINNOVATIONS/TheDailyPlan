'use strict';

angular.module('tdpApp')
  .directive('gridPanel', function () {
    return {
      restrict: 'A',
      controller: function ($scope, $element, $compile) {

        $scope.compileTemplate = function() {
          var panel = $scope.panel;
          console.log('panel:',panel);
          var container = $scope.findBoxContainer($element);
          var templateString = panel.settings.template;
          var panelElement = angular.element(templateString);

          container.empty();
          container.append(panelElement);
          $compile(panelElement)($scope);
        };

        $scope.findBoxContainer = function(element) {
          // panel placeholder is the first (and only) child of .widget-content
          return element.find('.box-content');
        };
      },
      link: function(scope) {
        var panel = scope.panel;

        // Compile the panel template, emit add event
        scope.compileTemplate();
        scope.$emit('widgetAdded', panel);
      }
    };
  });
