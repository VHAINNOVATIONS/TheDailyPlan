'use strict';

angular.module('tdpApp')
  .factory('FreeText', function FreeText($location, $rootScope, $http, $q) {
    return {
      resolveFreeTextTemplates: function(value, text, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http({
          url: '/api/freetextresolve',
          method: 'GET',
          params: {
            value: value,
            text: text
          }
        }).success(function(data) {
          deferred.resolve(data);
          return cb();
        }).error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      }
    };
  });
