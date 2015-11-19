'use strict';

angular.module('service.search', [])
        .service('Search', function ($http, $q) {
            
            this.validate =function(query){
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                var response = ds.validateObj(query);
                if (response && response.status == 0 ) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.errors);
                }
                return deferred.promise;
            }
            
            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                var response = ds.fetchObjById(id)
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };

            this.list = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                var result = ds.fetch({});
                if(result && result.status == 0){
                    deferred.resolve( result.data );
                }else{
                     deferred.reject("Server error");
                }
                return deferred.promise;
            };
            
            this.add = function(newSearch){
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                deferred.resolve( ds.addObj(newSearch) );
                return deferred.promise;
                
            }
            
             this.update = function (search) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                var response = ds.updateObj(search);
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };
        })