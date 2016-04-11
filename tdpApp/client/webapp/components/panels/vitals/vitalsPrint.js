'use strict';

var typeDisplay = {
  temperature: 'Temperature',
  pulse: 'Pulse',
  respiration: 'Respiration',
  bloodPressure: 'Blood Pressure',
  height: 'Height',
  weight: 'Weight',
  pain: 'Pain',
  pulseOxymetry: 'Pulse Oxymetry',
  centralVenousPressure: 'Central Venous Pressure',
  circumferenceGirth: 'Circumference Girth'
};

angular.module('tdpApp')
  .directive('dtVitalsPrint', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/panels/vitals/vitalsPrint.html',
      scope: {
        patient: '=',
        paneldetail: '='
      },
      controller: function ($scope, Vitals) {
        console.log('Patient Plan - vitals patient:', $scope.patient);
        Vitals.get($scope.patient, $scope.paneldetail).then(function(vitals) {
          console.log('Patient Plan - print vitals:', vitals);
          $scope.vitalSets = vitals.reduce(function(r, vital) {
            var dateTime = vital.dateTime;
            Object.keys(typeDisplay).forEach(function(type) {
              if (vital[type]) {
                var v = {
                  date: dateTime,
                };
                v.type = typeDisplay[type];
                v.value = vital[type].value;
                v.unit = vital[type].unit || '-';
                v.qualifier = vital[type].qualifier || '-';
                r.push(v);
              }
            });
            return r;
          }, []);
          console.log('Patient Plan - vitalSets:', $scope.vitalSets);
          $scope.vitalSetsError = null;
        }).catch( function() {
          $scope.vitalSetsError = 'Internal error loading vitals.';
        });
      }
    };
  });
