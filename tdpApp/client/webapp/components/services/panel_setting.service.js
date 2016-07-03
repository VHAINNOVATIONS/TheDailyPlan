'use strict';

angular.module('tdpApp')
    .factory('Panel_Setting', function Panel_Setting($http, $q) {
        var results = {};

        return {
            /**
             * Find Complete Panel_Setting by PanelType id
             *
             * @param  {String}   id    - query id
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            findByPanelTypeID: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/panel_setting/byPanelType/' + id).
                success(function(data) {
                    console.log('Panel_Setting findByPanelTypeID:', data);
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
        };
    });
