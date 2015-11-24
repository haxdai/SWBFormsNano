'use strict';

angular.module('service.art-search', [])
        .service('Art_Search', function ($http, $q) {


            this.list = function (searchId, status, sortBy) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                var req = {};
                req.data = {}
                if (searchId != null) {
                    req.data.search = searchId;
                }
                if (status != null) {
                    if (parseInt(status) == 4) {
                        req.data.ranking = {"$gt": 5};
                        req.data.status = {$in:[1,4]}
                    } else {
                        req.data.status = status;
                    }

                }
                if (sortBy != null) {
                    req.sortBy = [sortBy];
                }


                ds.fetch(req, function (response) {
                    if (response) {
                        deferred.resolve(response.data.map(function (artSearch) {
                            return artSearch.article;
                        }));
                    } else {
                        deferred.reject("No data");
                    }
                })

                return deferred.promise;
            };

            this.listbyStatusSearchId = function (searchId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                ds.fetchObj({search: searchId}, function (response) {
                    if (response) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }
                })

                return deferred.promise;
            };

            this.bySearchArticleId = function (searchId, articleId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                ds.fetchObj({search: searchId, article: articleId}, function (response) {
                    if (response) {
                        deferred.resolve(response.data[0]);
                    } else {
                        deferred.reject("No data");
                    }
                })
                return deferred.promise;
            }

            this.update = function (art_search) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Art_Search");
                ds.updateObj(art_search, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

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