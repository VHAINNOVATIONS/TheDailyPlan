'use strict';

angular.module('tdpApp')
  .controller('PatientPlanCtrl', function ($scope, $resource, Patient, Demographics, Allergy, Immunizations, Problems, Vitals) {
  	var self = this;
    self.cdate = new Date();
    self.demographics = null;
    self.allergies = null;
    self.immunizations = null;
    self.problems = null;
    self.vitals = null;
    self.items = Patient.getSelectedPatients();

    self.vitalsLoading = true;

    self.vitalsGridOptions = {
      expandableRowTemplate: 'app/patientPlan/expandableRowTemplate.html',
      expandableRowHeight: 150,
      //subGridVariable will be available in subGrid scope
      expandableRowScope: {
        subGridVariable: 'subGridScopeVariable'
      }
    };

    self.vitalsGridOptions.columnDefs = [
      { name: 'dateTime', displayName: 'Date' },
      { name: 'getTemp()', displayName: 'Temp' },
      { name: 'bloodPressure.value', displayName: 'Blood Pressure'},
      { name: 'pulse.value', displayName: 'Pulse'}
    ];


    self.problemsLoading = true;

    self.problemsGridOptions = {
      enableExpandable: false,
      expandableRowTemplate: 'app/patientPlan/expandableRowTemplate.html',
      expandableRowHeight: 150,
      //subGridVariable will be available in subGrid scope
      expandableRowScope: {
        subGridVariable: 'subGridScopeVariable'
      }
    };

    self.problemsGridOptions.columnDefs = [
      { name: 'facility.name', displayName: 'Facility' },
      { name: 'status', displayName: 'Status' },
      { name: 'onsetDate', displayName: 'Date Onset'},
      { name: 'code', displayName: 'Code'},
      { name: 'description', displayName: 'Description'}
    ];
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
        self.problemsGridOptions.data = data;
        self.problemsLoading = false;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });

      Vitals.getByEIN(self.items[0])
      .then( function(data) {
        console.log('Patient Plan - vitals:',data);
        self.vitalsGridOptions.data = data;
        self.vitalsLoading = false;
      })
      .catch( function(err) {
        self.errors.other = err.message;
      });
    }

    self.vitalsGridOptions.onRegisterApi = function(gridApi){
      self.vitalsGridApi = gridApi;
    };

    self.expandVitalsRows = function() {
      self.vitalsGridApi.expandable.expandAllRows();
    };

    self.collapseVitalsRows = function() {
      self.vitalsGridApi.expandable.collapseAllRows();
    };

    self.problemsGridOptions.onRegisterApi = function(gridApi){
      self.problemsGridApi = gridApi;
    };

    self.expandProblemsRows = function() {
      self.problemsGridApi.expandable.expandAllRows();
    };

    self.collapseProblemsRows = function() {
      self.problemsGridApi.expandable.collapseAllRows();
    };

  });
