'use strict';

angular.module('tdpApp')
  .factory('FreeText', function FreeText($http, Panel_Detail) {
    return {
      get: function(patientId, panelId) {
        return Panel_Detail.findCompleteByID(panelId)
          .then(function(panel_details) {
            var content;
            panel_details.forEach(function(pd) {
              if (pd.setting_name === 'Content') {
                content = pd.detail_value || pd.setting_value || '';
              }
            });
            return content;
          })
          .then(function(content) {
            var tius = content.match(/\|[^\|]+\|/g);
            if (tius && tius.length) {
              var httpParams = {
                url: '/api/freetextresolve',
                method: 'GET',
                params: {
                  value: patientId,
                  text: content
                }
              };
              return $http(httpParams).then(function(response) {
                return response.data;
              });
            } else {
              return content;
            }
          });
      }
    };
  });
