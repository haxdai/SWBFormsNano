'use strict';

angular.module('service.gene', [])
        .service('Gene', function ($http, $q) {
            
            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene");
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
                var ds = eng.getDataSource("Gene");
                var result = ds.fetch({});
                if(result.status == 0 ){
                    deferred.resolve(result.data);
                }else{
                    deferred.reject("Server error");
                }
                return deferred.promise;
            };



        })