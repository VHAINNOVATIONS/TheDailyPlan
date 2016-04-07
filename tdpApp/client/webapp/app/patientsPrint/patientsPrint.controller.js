'use strict';

angular.module('tdpApp')
    .controller('PatientsPrintCtrl', function (Patient) {
        var self = this;
        self.printPatients = Patient.getPrintPatients();
        self.panels = Patient.getPrintPanels();

        self.print = function() {
            window.print();
        };
    });
