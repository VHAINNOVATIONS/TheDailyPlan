'use strict';

angular.module('tdpApp')
  .factory('Visits', function Visits($location, $rootScope, $http, $q, Panel_Detail) {
    return {

      /**
       * Get Visits
       *
       * @param  {String}   patientId    - query patientId
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      get: function(patientId, panelId) {
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
              return response.data;
            });
          });
    }
  };
});
