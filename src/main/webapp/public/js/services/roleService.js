'use strict';

angular.module('service.role', [])
        .service('Role', function ($http, $q) {

            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Role");
                if(!id){
                    id=""
                }
                ds.fetchObjById(id, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                })
                return deferred.promise;
            };
        })