'use strict';

angular.module('service.art-search', [])
        .service('Art_Search', function ($http, $q) {
            var limit = 1;
            
            this.list = function (searchId,status,pag) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                var req = {};
                if(searchId!=null) {
                    req.data = {}
                    req.data.search = searchId;
                }
                if(status!=null) req.status = status;
                if(pag!=null){ 
                    req.startRow = (pag-1) * limit;
                    req.endRow = (pag) * limit;
                }
                var response = ds.fetch(req)
                if (response) {
                    response.limit = limit;
                    deferred.resolve(response);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };
            
            this.listbyStatusSearchId = function (searchId) {
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