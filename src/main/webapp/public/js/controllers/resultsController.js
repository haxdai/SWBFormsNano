'use strict';

angular.module('controller.results', [])
        .controller('ResultsController', function ($scope, $rootScope, $stateParams, Art_Search, Article) {
            $scope.searchId = $stateParams.id;
            $scope.status = 0; /*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado, 4 Recomendado*/
            $scope.pag = 1;
            $scope.maxPage;
            $scope.totalRows;
            $scope.limit;


            $scope.articleList = [];

            $scope.prev = function () {
                if ($scope.pag > 1)
                    $scope.pag--;
                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
            }

            $scope.next = function () {
                if ($scope.pag < $scope.maxPage) {
                    $scope.pag++;
                }
                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
            }

            $scope.discard = function (art_search, i) {
                var statusPrev = art_search.status; 
                art_search.status = 3;
                Art_Search.update(art_search).then(function () {
                    $scope.articleList.splice(i, 1);
                    //$scope.articleList = [];
                    $scope.maxPage = Math.ceil(--$scope.totalRows / $scope.limit);
                     if(art_search.ranking>5){
                        $rootScope.$emit('articleRecommended', $scope.searchId,-1);
                    }
                    if (statusPrev == 1) {
                        $scope.updateResults($scope.searchId, $scope.status, -1);
                    } else {
                        if ($scope.maxPage < $scope.pag) {
                            $scope.pag = $scope.maxPage;
                            $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
                        } else {
                            $scope.updateResults($scope.searchId, $scope.status, $scope.pag, 1);
                        }
                    }
                })
            }

            $scope.accept = function (art_search, i) {
                var statusPrev = art_search.status; 
                art_search.status = 2;
                Art_Search.update(art_search).then(function () {
                    $scope.articleList.splice(i, 1);
                    //$scope.articleList = [];
                    $scope.maxPage = Math.ceil(--$scope.totalRows / $scope.limit);
                   if(art_search.ranking>5){
                        $rootScope.$emit('articleRecommended', $scope.searchId,-1);
                   }
                    if (statusPrev == 1) {
                        $scope.updateResults($scope.searchId, $scope.status, -1);
                    } else {

                        if ($scope.maxPage < $scope.pag) {
                            $scope.pag = $scope.maxPage;
                            $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
                        } else {
                            $scope.updateResults($scope.searchId, $scope.status, $scope.pag, 1);

                        }
                    }
                })
            }
            $scope.statusChange = function (status) {
                $scope.articleList = [];
                $scope.pag = 1;
                $scope.status = parseInt(status);
                $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
            }


            $scope.updateResults = function (searchId, status, pag, ele) {
                if ($scope.maxPage) {
                    $scope.maxPage = Math.ceil($scope.totalRows / $scope.limit);
                    if ($scope.maxPage < $scope.pag) {
                        pag = $scope.pag = $scope.maxPage;
                    }
                }
                Art_Search.list(searchId, status, pag, ele).then(function (artSearchList) {
                    $scope.totalRows = artSearchList.totalRows;
                    $scope.limit = artSearchList.limit;
                    $scope.maxPage = Math.ceil($scope.totalRows / $scope.limit);
                    artSearchList.data.forEach(function (artSearch) {
                        if (artSearch.status == 1) {
                            if (artSearch.ranking > 5) {
                                $rootScope.$emit('articleRecommended', $scope.searchId,1);
                                artSearch.status = 4;
                            } else {
                                artSearch.status = 0;
                            }
                            $rootScope.$emit('articleRead', $scope.searchId);
                          
                            $scope.totalRows--;
                            Art_Search.update(artSearch)
                            artSearch.status = 1;
                        }
                        Article.byId(artSearch.article).then(function (article) {
                            $scope.articleList.push({article: article,
                                artSearch: artSearch
                            })

                        });
                    });
                });

            }


            $scope.updateResults($scope.searchId, $scope.status, $scope.pag);

        })