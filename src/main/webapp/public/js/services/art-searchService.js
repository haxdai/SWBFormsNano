'use strict';

angular.module('service.art-search', [])
        .service('Art_Search', function ($http, $q) {
            var limit = 3;

            this.list = function (searchId, status, pag, ele) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                var req = {};
                req.data = {}
                if (searchId != null) {
                    req.data.search = searchId;
                }
                if (status != null) {
                    req.data.status = status;
                }
                if (pag != null) {
                    if (pag == -1) {
                        req.startRow = 0;
                        req.endRow = 1;
                    } else {
                        req.endRow = (pag) * limit;
                        if (ele != null) {
                            req.startRow = ((pag - 1) * limit) + limit - ele;
                        } else {
                            req.startRow = (pag - 1) * limit;
                        }
                    }
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
                var response = ds.fetchObj({search: searchId})
                if (response) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            };

            this.update = function (art_search) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                var response = ds.updateObj(art_search);
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



        })