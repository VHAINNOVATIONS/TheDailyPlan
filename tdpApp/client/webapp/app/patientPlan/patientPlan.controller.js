'use strict';

angular.module('tdpApp')
  .controller('PatientPlanCtrl', function ($scope, $resource, Patient, Demographics, Allergy, Immunizations, Problems, Vitals) {
  	var self = this;
    self.cdate = new Date();
    self.demographics = null;
    self.items = Patient.getSelectedPatients();
    self.patient = null;

    console.log('Patient Plan - Items:',self.items);

    if(self.items.length > 0 && self.items[0])
    {
      self.patient = self.items[0];
      Demographics.getByEIN(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - demographics:',data);
        self.demographics = data;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    }
  });
