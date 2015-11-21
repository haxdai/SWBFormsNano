'use strict';

angular.module('service.search', [])
        .service('Search', function ($http, $q) {

            this.validate = function (query) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
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
                var ds = eng.getDataSource("Search");
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
                var ds = eng.getDataSource("Search");
                ds.fetch({}, function (result) {
                    if (result && result.status == 0) {
                        deferred.resolve(result.data);
                    } else {
                        deferred.reject("Server error");
                    }
                });
                return deferred.promise;
            };

            this.add = function (newSearch) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                ds.addObj(newSearch, function (result) {
                    if (result && result.status == 0) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Server error");
                    }
                })
                
                return deferred.promise;

            }

            this.update = function (search) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Search");
                ds.updateObj(search,function(response){
                      if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                });
              
                return deferred.promise;
            };
        })