'use strict';

angular.module('tdpApp')
  .factory('Visits', function Visits($location, $rootScope, $http, $q, Panel_Detail) {
    return {
      columnDefs: [{
        name: 'time',
        displayName: 'Date',
        width:'*',
        btsrpWidth: '4'
      }, {
        name: 'clinic',
        displayName: 'Clinic',
        width:'*',
        btsrpWidth: '4'
      }, {
        name: 'status',
        displayName: 'Status',
        width:'*',
        btsrpWidth: '4'
      }],
      loadingMsg: 'Loading future visits...',
      emptyMsg: 'No future visits found',

      /**
       * Get Visits
       *
       * @param  {String}   patientId    - query patientId
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      get: function(patientId, panelId) {
        var self = this;
        return Panel_Detail.findCompleteByID(panelId)
          .then(function(panel_details) {
            var numDaysFuture = 30;
            panel_details.forEach(function(pd) {
              if (pd.setting_name === 'Number of Future Days') {
                numDaysFuture = pd.detail_value || pd.setting_value || 30;
              }
            });
            return {
              patientId: patientId,
              numDaysFuture: numDaysFuture
            };
          })
          .then(function(params) {
            var httpParams = {
              url: '/api/visits',
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
          });
    }
  };
});
