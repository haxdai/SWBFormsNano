'use strict';

angular.module('service.user', [])
        .service('User', function ($http, $q) {

            this.getUser = function () {
                var deferred = $q.defer();
                eng.getUser(function (result) {

                    if (result) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Server error");
                    }
                });
                return deferred.promise;
            };

        })