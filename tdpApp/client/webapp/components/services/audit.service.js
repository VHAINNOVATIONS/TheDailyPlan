'use strict';

angular.module('tdpApp')
  .factory('Audit', function Audit($location, $rootScope, $http, $q) {
    return {
      create: function(accessInfo, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/audit/user', accessInfo).
        success(function(data) {
          console.log('audit - data:',data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      }
    };
  });
