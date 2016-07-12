'use strict';

angular.module('service.alteration', [])
        .service('Alteration', function ($http, $q, Search) {

            this.validate = function (query) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
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
                var ds = eng.getDataSource("AlterationMolecular");
                ds.fetchObjById(id, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                })

                return deferred.promise;
            };

            this.list = function (geneId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                var query = {};
                if (geneId) {
                    query.gene = geneId;
                }
                ds.fetchObj(query, function (response) {
                    if (response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("Server error");
                    }
                });

                return deferred.promise;
            };

            this.save = function (alt) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                ds.addObj(alt, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };

            this.update = function (alt) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                ds.updateObj(alt, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };

            this.remove = function (altId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                Search.list({altMolecular: altId}).then(function (data) {
                    if (data.length > 0) {
                        deferred.reject("Cannot delete this molecular alteration, because is part of a Search");
                    } else {
                        ds.removeObjById(altId, function (response) {
                            if (response && response.status == 0) {
                                deferred.resolve(response.data);
                            } else {
                                deferred.reject("No data");
                            }
                        });
                    }
                }, function () {

                });
                return deferred.promise;
            };

        })