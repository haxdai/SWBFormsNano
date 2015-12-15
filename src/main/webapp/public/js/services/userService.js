'use strict';

angular.module('service.user', [])
        .service('User', function ($http, $q) {
            var user;
            this.getUser = function () {
                var deferred = $q.defer();
                if(user){
                     deferred.resolve(user);
                }else{
                eng.getUser(function (result) {
                    if (result) {
                        user = result;
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Server error");
                    }
                });
            }
                return deferred.promise;
            };

        })