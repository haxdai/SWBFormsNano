'use strict';

angular.module('service.alteration', [])
        .service('Alteration', function ($http, $q) {
            
            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                var response = ds.fetchObjById(id)
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };

            this.list = function (geneId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                var query = {};
                if(geneId){
                    query.gene = geneId;
                }
                var result = ds.fetchObj(query);
                if(result.status == 0 ){
                    deferred.resolve(result.data);
                }else{
                    deferred.reject("Server error");
                }
                return deferred.promise;
            };
            
            this.save = function (alt) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                var response = ds.addObj(alt);
                if (response && response.status == 0 ) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };
            
               this.update = function (alt) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("AlterationMolecular");
                var response = ds.updateObj(alt);
                if (response && response.status == 0 ) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };


        })