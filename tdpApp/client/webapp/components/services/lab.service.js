'use strict';

angular.module('tdpApp')
  .factory('Labs', function Labs($location, $rootScope, $http, $q) {
    var results = {};
    var labTestNames = [];
    var defaultTestNames = ['MAGNESIUM', 'POTASSIUM', 'HDL', 'TRIGLYCERIDE', 'CHOLESTEROL','CREATININE','HEMOGLOBIN A1C','LDL CHOLESTEROL'];



    return {

      /**
       * Get Labs
       *
       * @param  {String}   value    - query value
       * @param  {Function} callback - optional
       * @return {Promise}
       */

      getByID: function(value, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        var parameters = {};
        var config = {};
        parameters.toDate = '3161010';
        parameters.fromDate = '1501010';
        parameters.testNames = labTestNames.length > 0 ? labTestNames : defaultTestNames;
        config.params = parameters;

        $http.get('/api/labs/' + value, config).
        success(function(data) {
          console.log('Labs:',data);
          var allLabs = [];
          var i = 0;
          for(i = 0; i < data.length; i++){
            /*data[i].subGridOptions = {
              columnDefs: [ {name:"Name", field:"labTest.name"},{name:"Value", field:"value"},{name:"Units", field:"labTest.units"},{name:"Range", field:"labTest.refRange"} ],
              data: (!angular.isUndefined(data[i].labResults) ? data[i].labResults : [])
            };*/
            var x = 0;
            for(x = 0; x < data[i].labResults.length; x++){
              data[i].labResults[x].date = data[i].specimen.collectionDate;
              allLabs.push(data[i].labResults[x]);
            }
          }
          results = allLabs;
          deferred.resolve(allLabs);
          return cb();
        }).
        error(function(err) {

          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Search Patients By Clinic
       *
       * @param  {String}   value    - query value
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      byName: function(value, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/labs/byName/' + value).
        success(function(data) {
          console.log('LabsByName:',data);
          results = data;
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {

          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
      /**
       * Panel Details - Get and Set
      */
      getLabTestNames: function() {
          return labTestNames;
      },
      setLabTestNames: function(value) {
          labTestNames = value;
      },
    };
  });
