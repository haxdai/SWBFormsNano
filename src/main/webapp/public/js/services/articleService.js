'use strict';

angular.module('service.article', [])
        .service('Article', function ($http, $q, Art_Search) {
            var limit = 5;
            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Article");
                ds.fetchObjById(id, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };

            this.list = function (data, sortBy, pag, ele) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Article");
                var req = {};
                req.data = {}
                if (data != null) {
                    req.data._id = data;
                }
                if (sortBy != null) {
                    req.sortBy = [sortBy];
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
                ds.fetch(req, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                })

                return deferred.promise;
            }

            this.listBySearchId = function (searchId, status, sortBy, pag, ele) {
                var deferred = $q.defer();
                var sortArtSearch = null;
                var Article = this;
                if (sortBy != null) {
                    if (sortBy == "ranking" || sortBy == "-ranking") {
                        sortArtSearch = sortBy;
                        sortBy = null;
                    }
                }
                Art_Search.list(searchId, status, sortArtSearch).then(function (articleIds) {
                    var articleIdsLength = articleIds.length
                    if (sortBy == null) {
                        if (pag != null) {
                            if (pag == -1) {
                                articleIds = articleIds.slice(0, 1)
                            } else {
                                var endRow = (pag) * limit;
                                if (ele != null) {
                                    articleIds = articleIds.slice(((pag - 1) * limit) + limit - ele, endRow)
                                } else {
                                    articleIds = articleIds.slice((pag - 1) * limit, endRow)
                                }
                            }
                            pag = null;
                        }
                    }
                    Article.list(articleIds, sortBy, pag, ele).then(function (articleList) {


                        if (articleList && articleList.data.length > 0) {
                            if (sortBy == null) {
                                articleList.data = articleList.data.sort(function (a, b) {
                                    return (articleIds.findIndex(function (e) {
                                        return (e === a._id);
                                    }) -
                                            articleIds.findIndex(function (e) {
                                                return (e === b._id);
                                            }))
                                })
                            }
                            articleList.totalRows = articleIdsLength
                            articleList.limit = limit
                            var artCount = 0;
                            articleList.data.forEach(function (a, i) {
                                Art_Search.bySearchArticleId(searchId, a._id).then(function (artSearch) {
                                    artCount++;
                                    articleList.data[i].artSearch = artSearch;
                                    if (articleList.data.length === artCount) {
                                        deferred.resolve(articleList);
                                    }
                                })
                            });

                        } else {
                            deferred.reject("No data");
                        }

                    }, function (error) {
                        deferred.reject(error);
                    })
                }, function (error) {
                    deferred.reject(error);
                })
                return deferred.promise;
            }

            this.update = function (article) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Article");
                ds.updateObj(article, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });
                return deferred.promise;
            };
        })