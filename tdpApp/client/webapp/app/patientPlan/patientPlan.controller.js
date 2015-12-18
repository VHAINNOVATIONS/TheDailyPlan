'use strict';

angular.module('tdpApp')
  .controller('PatientPlanCtrl', function ($scope, $resource, Patient, Demographics, Allergy) {
  	var self = this;
    self.demographics = null;
    self.allergies = null;
    self.items = Patient.getSelectedPatients();

    console.log('Patient Plan - Items:',self.items);

    if(self.items.length > 0 && self.items[0])
    {
      Demographics.getByEIN(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - demographics:',data);
        self.demographics = data;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });

      Allergy.getByEIN(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - allergies:',data);
        self.allergies = data;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    }




  });
