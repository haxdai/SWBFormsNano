'use strict';

angular.module('service.gene-cancer', [])
        .service('Gene_Cancer', function ($http, $q) {
            
            this.listbyGeneId = function (geneId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene_Cancer");
                var response = ds.fetchObj({gene:geneId})
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
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
                var response = ds.addObj(geneCancer);
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };

        })