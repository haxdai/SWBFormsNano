'use strict';

angular.module('service.cancerType', [])
        .service('CancerType', function ($http, $q) {
            
            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                var response = ds.fetchObjById(id)
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };
            
            this.listByGenId = function (idGene) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                deferred.resolve(ds.fetch({}));
                return deferred.promise;
            };

            this.list = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                deferred.resolve(ds.fetch({}));
                return deferred.promise;
            };



        })