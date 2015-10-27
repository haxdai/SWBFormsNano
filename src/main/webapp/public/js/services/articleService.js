'use strict';

angular.module('service.article', [])
        .service('Article', function ($http, $q) {

            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Article");
                var response = ds.fetchObjById(id);
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };
            
            this.update = function (article) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Article");
                var response = ds.updateObj(article);
                if (response) {
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };
        })