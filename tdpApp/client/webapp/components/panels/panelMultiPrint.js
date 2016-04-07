'use strict';

angular.module('tdpApp')
  .directive('gridMultiPanelPrint', function () {
    return {
      restrict: 'A',
      controller: function ($scope, $element, $compile) {

        $scope.compileTemplate = function() {
          var panel = $scope.panel;
          console.log('print panel: ',panel);
          var printPatient = $scope.printPatient;
          console.log('print patient: ', printPatient);
          var container = $scope.findPrintBoxContainer($element);
          var templateString = panel.print.replace('patient="ctrl.patient"', 'patient="printPatient.id"');
          console.log('template: ' + templateString);
          if (templateString) {
            var panelElement = angular.element(templateString);

            container.empty();
            container.append(panelElement);
            $compile(panelElement)($scope);
            return true;
          } else {
            return false;
          }
        };

        $scope.findPrintBoxContainer = function(element) {
          // panel placeholder is the first (and only) child of .widget-content
          return element.find('.box-content-print');
        };
      },
      link: function(scope) {
        var panel = scope.panel;

        // Compile the panel template, emit add event
        var result = scope.compileTemplate();
        if (result) {
          scope.$emit('widgetAdded', panel);
        }
      }
    };
  });
