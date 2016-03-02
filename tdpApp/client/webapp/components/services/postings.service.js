'use strict';

angular.module('tdpApp')
  .factory('Postings', function Postings($http) {
    return {
     columnDefs: [{
        name: 'type',
        displayName: 'Type',
        width:'*',
        btsrpWidth: '3'
      }, {
        name: 'text',
        displayName: 'Text',
        width:'***',
        btsrpWidth: '9'
      }],
      loadingMsg: 'Loading postings...',
      emptyMsg: 'No postings found',
      /**
       * Get ClinicalWarnings
       *
       * @param  {String}   value    - query value
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      get: function(patientId) {
        var self = this;
        var params = {
          patientId: patientId
        };
        var httpParams = {
          url: '/api/postings',
          method: 'GET',
          params: params
        };
        return $http(httpParams).then(function(response) {
          var result = response.data;
          result.columns = self.columnDefs;

          result.forEach(function(row) {
            row.columns = result.columns.map(function(p) {
              return {
                btsrpWidth: p.btsrpWidth,
                value: row[p.name]
              };
            });
          });
          return result;
        });
      }
    };
  });
