'use strict';

angular.module('service.search', [])
        .service('Search', function ($http, $q) {
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
                deferred.resolve( ds.fetch({}) );
                return deferred.promise;
            };
            
            this.add = function(newSearch){
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                deferred.resolve( ds.addObj(newSearch) );
                return deferred.promise;
                
            }
        })