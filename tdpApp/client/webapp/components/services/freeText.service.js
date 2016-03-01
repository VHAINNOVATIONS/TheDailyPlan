'use strict';

angular.module('tdpApp')
  .factory('FreeText', function FreeText($http, $q) {
    return {
      get: function(patientId, panelDetails) {
        var content = '';
        panelDetails.forEach(function(pd) {
          if (pd.setting_name === 'Content') {
            content = pd.detail_value || pd.setting_value || '';
          }
        });
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
          var deferred = $q.defer();
          deferred.resolve(content);
          return deferred.promise;
        }
      }
    };
  });
