'use strict';

angular.module('service.gene', [])
        .service('Gene', function ($http, $q) {

            this.validate = function (query) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene");
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
                var ds = eng.getDataSource("Gene");
                ds.fetchObjById(id, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }

                })
                return deferred.promise;
            };

            this.list = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene");
                ds.fetch({}, function (result) {
                    if (result.status == 0) {
                        deferred.resolve(result.data);
                    } else {
                        deferred.reject("Server error");
                    }

                });
                return deferred.promise;
            };

            this.save = function (gene) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene");
                ds.addObj(gene, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }

                });
                return deferred.promise;
            };

        })