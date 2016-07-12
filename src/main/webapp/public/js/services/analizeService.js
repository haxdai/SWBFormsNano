'use strict';

angular.module('service.analize', [])
        .service('Analize', function ($http, $q) {

            this.validate = function (query) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Analize");
                ds.validateObj(query, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.errors);
                    }

                });
                return deferred.promise;
            }
            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Analize");
                if (!id) {
                    id = ""
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


            this.save = function (gene) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Analize");
                ds.addObj(gene, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else if (response.status == -2) {
                        deferred.reject(response.msgError);

                    } else {
                        deferred.reject("No data");
                    }

                });
                return deferred.promise;
            };
        })