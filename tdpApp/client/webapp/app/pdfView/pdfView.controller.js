'use strict';

angular.module('tdpApp')
    .controller('PdfViewCtrl', function (Patient) {
        var self = this;
        self.filepath = Patient.getPDFFilepath();
    });
