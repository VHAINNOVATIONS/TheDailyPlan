'use strict';

angular.module('tdpApp')
  .factory('Orders', function Orders($http) {
    return {

      /**
       * Get OrdersAsClassified
       *
       * @param  {String}   patientId    - query patientId
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      get: function(patientId) {
       var httpParams = {
          url: '/api/orders',
          method: 'GET',
          params: {
            patientId: patientId
          }
        };
        return $http(httpParams).then(function(response) {
          var result = response.data;
          //result.columns = columnDefs;

          //result.forEach(function(row) {
          //  row.columns = result.columns.map(function(p) {
          //    return {
          //      btsrpWidth: p.btsrpWidth,
          //      value: row[p.name]
          //    };
          //  });
          //});
          return result;
        });
      }
    };
  });
