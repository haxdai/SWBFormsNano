'use strict';

angular.module('controller.results', [])
        .controller('ResultsController', function ($scope, $stateParams, Art_Search, Article) {
            $scope.searchId = $stateParams.id;
            $scope.status = 0; /*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado*/
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
                art_search.status = 3;
                Art_Search.update(art_search).then(function () {
                    $scope.articleList.splice(i, 1);
                    $scope.articleList = [];
                    $scope.maxPage = Math.ceil(--$scope.totalRows / $scope.limit);
                    if($scope.maxPage<$scope.pag){
                        $scope.pag = $scope.maxPage;
                    }
                    $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
                })
            }

            $scope.accept = function (art_search, i) {
                art_search.status = 2;
                Art_Search.update(art_search).then(function () {
                    $scope.articleList.splice(i, 1);
                    $scope.articleList = [];
                    $scope.maxPage = Math.ceil(--$scope.totalRows / $scope.limit);
                    if($scope.maxPage<$scope.pag){
                        $scope.pag = $scope.maxPage;
                    }
                    $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
                })
            }
            $scope.statusChange = function (status) {
                $scope.articleList = [];
                $scope.pag = 1;
                $scope.status = parseInt(status);
                $scope.updateResults($scope.searchId, $scope.status, $scope.pag);
            }


            $scope.updateResults = function (searchId, status, pag) {

                Art_Search.list(searchId, status, pag).then(function (artSearchList) {
                    $scope.maxPage = Math.ceil(artSearchList.totalRows / artSearchList.limit);
                    $scope.totalRows = artSearchList.totalRows;
                    $scope.limit = artSearchList.limit; 
                    artSearchList.data.forEach(function (artSearch) {
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