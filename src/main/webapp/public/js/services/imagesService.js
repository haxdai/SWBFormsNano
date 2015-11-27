'use strict';

angular.module('service.images', [])
        .service('Image', function ($http, $q) {


            this.list = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Image");
                ds.fetch({}, function (result) {
                    if (result.status == 0) {
                        deferred.resolve(result.data);
                    } else {
                        deferred.reject("Server error");
                    }
                });
                return deferred.promise;
            };

        })