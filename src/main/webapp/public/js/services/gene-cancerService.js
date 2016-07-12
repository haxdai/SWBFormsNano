'use strict';

angular.module('service.gene-cancer', [])
        .service('Gene_Cancer', function ($http, $q) {

            this.listbyGeneId = function (geneId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene_Cancer");
                ds.fetchObj({gene: geneId}, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                })

                return deferred.promise;
            };
            
             this.byGeneIdCancerId = function (geneId,cancerId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene_Cancer");
                ds.fetchObj({gene: geneId,cancer:cancerId}, function (response) {
                    if (response && response.status==0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }
                })

                return deferred.promise;
            };
            /*
             this.listByCancerId = function (cancerId) {
             var deferred = $q.defer();
             var ds = eng.getDataSource("Gene");
             deferred.resolve(ds.fetch({}));
             return deferred.promise;
             };*/

            this.save = function (geneCancer) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene_Cancer");
                ds.addObj(geneCancer, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };
            
             this.remove = function (geneCancerId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene_Cancer");
                ds.removeObjById(geneCancerId, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };

        })