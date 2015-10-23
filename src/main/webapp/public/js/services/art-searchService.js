'use strict';

angular.module('service.art-search', [])
        .service('Art_Search', function ($http, $q) {
            
            this.listbySearchId = function (searchId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                var response = ds.fetchObj({search:searchId})
                if (response) {
                    deferred.resolve(response.data);
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



        })