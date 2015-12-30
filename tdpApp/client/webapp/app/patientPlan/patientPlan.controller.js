'use strict';

angular.module('tdpApp')
  .controller('PatientPlanCtrl', function ($scope, $resource, Patient, Demographics, Allergy, Immunizations, Problems, Vitals, DTOptionsBuilder, DTColumnDefBuilder) {
  	var self = this;
    self.cdate = new Date();
    self.demographics = null;
    self.allergies = null;
    self.immunizations = null;
    self.problems = null;
    self.vitals = null;
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
        loadAllergies();
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });

      Immunizations.getByEIN(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - immunizations:',data);
        self.immunizations = data;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });

      Problems.getByEIN(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - problems:',data);
        self.problems = data;
        loadProblems();
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });

      Vitals.getByEIN(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - vitals:',data);
        self.vitals = data;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    }

    function loadAllergies() {
      self.dtOptionsAllergy = DTOptionsBuilder.newOptions().withPaginationType('simple').withDisplayLength(4);
      self.dtColumnDefsAllergy = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
      ];
    }

    function loadVitals() {
      self.dtOptionsVital = DTOptionsBuilder.newOptions().withPaginationType('simple').withDisplayLength(4);
      self.dtColumnDefsVital = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
      ];
    }

    function loadProblems() {
      self.dtOptionsProblem = DTOptionsBuilder.newOptions().withPaginationType('simple').withDisplayLength(4);
      self.dtColumnDefsProblem = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4)
      ];
    }

    function loadImmunizations() {
      self.dtOptionsImmunization = DTOptionsBuilder.newOptions().withPaginationType('simple').withDisplayLength(4);
      self.dtColumnDefsImmunization = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
      ];
    }


  });
