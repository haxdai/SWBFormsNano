'use strict';

angular.module('controller.results', [])
        .controller('ResultsController', function ($scope, $rootScope, $stateParams, Art_Search, Article, Search, Gene) {
            $scope.searchId = $stateParams.id;
            console.log($stateParams)
            var status = parseInt($stateParams.status);
            if($stateParams.status>=0 && $stateParams.status<=4 ){
                $scope.status = status;
            }else{
                $scope.status = 4; /*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado, 4 Recomendado*/
            }
            
            $scope.statuslist = ["Unclassified","New","Accepted","Rejected","Recommended"];

            $scope.pag = 1;
            $scope.maxPage;
            $scope.totalRows;
            $scope.sortBy;
            $scope.limit;
            $scope.gene;

            $scope.articleList = [];


            Search.byId($scope.searchId).then(function (search) {
                Gene.byId(search.gene).then(function (gene) {
                    $scope.gene = gene;
                })
            }, function (error) {
                console.log(error)
            })

            $scope.prev = function () {
                if ($scope.pag > 1)
                    $scope.pag--;
                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
            }

            $scope.next = function () {
                if ($scope.pag < $scope.maxPage) {
                    $scope.pag++;
                }
                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
            }

            $scope.discard = function (art_search, i) {
                var statusPrev = art_search.status;
                art_search.status = 3;
                Art_Search.update(art_search).then(function () {
                    $scope.articleList.splice(i, 1);
                    //$scope.articleList = [];
                    $scope.maxPage = Math.ceil(--$scope.totalRows / $scope.limit);
                    if (art_search.ranking > 5) {
                        $rootScope.$emit('articleRecommended', $scope.searchId);
                    }
                    if (statusPrev == 1) {
                        $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, -1);
                    } else {
                        if ($scope.maxPage < $scope.pag) {
                            $scope.pag = $scope.maxPage;
                            $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
                        } else {
                            $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag, 1);
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
                    if (art_search.ranking > 5) {
                        $rootScope.$emit('articleRecommended', $scope.searchId, -1);
                    }
                    if (statusPrev == 1) {
                        $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, -1);
                    } else {

                        if ($scope.maxPage < $scope.pag) {
                            $scope.pag = $scope.maxPage;
                            $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
                        } else {
                            $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag, 1);

                        }
                    }
                })
            }
            $scope.statusChange = function (status) {
                $scope.articleList = [];
                $scope.pag = 1;
                $scope.status = parseInt(status);
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
            }

            $scope.filterChange = function (filter) {
                console.log("filtrando : " + filter)
                $scope.articleList = [];
                $scope.pag = 1;
                $scope.sortBy = filter;
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
            }


            $scope.updateResults = function (searchId, status, orderBy, pag, ele) {
                if ($scope.maxPage) {
                    $scope.maxPage = Math.ceil($scope.totalRows / $scope.limit);
                    if ($scope.maxPage < $scope.pag) {
                        pag = $scope.pag = $scope.maxPage;
                    }
                }
                Article.listBySearchId(searchId, status, orderBy, pag, ele).then(function (artSearchList) {
                    
                    $scope.totalRows = artSearchList.totalRows;
                    $scope.limit = artSearchList.limit;
                    $scope.maxPage = Math.ceil($scope.totalRows / $scope.limit);
                    artSearchList.data.forEach(function (art) {
                        if (art.artSearch.status == 1) {
                            if (art.artSearch.ranking > 5) {
                                $rootScope.$emit('articleRecommended', $scope.searchId, 1);
                                art.artSearch.status = 4;
                            } else {
                                art.artSearch.status = 0;
                            }
                            $rootScope.$emit('articleRead', $scope.searchId);

                            $scope.totalRows--;
                            Art_Search.update(art.artSearch)
                            art.artSearch.status = 1;
                        }
                        $scope.articleList.push({article: art, artSearch: art.artSearch})
                    });
                },function(error){
                    if(error == "No data"){
                        $scope.maxPage = 0;
                    }
                });

            }


            $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
            
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        })