'use strict';

angular.module('controller.results', [])
        .controller('ResultsController', function ($scope, $stateParams, Art_Search,Article) {
            $scope.searchId = $stateParams.id;
            $scope.articleList =  [];
    
            Art_Search.listbySearchId($scope.searchId).then(function(artSearchList){
                console.log(artSearchList)
                artSearchList.forEach(function(artSearch){
                    Article.byId(artSearch.article).then(function(article){
                        console.log(article)
                        $scope.articleList.push({article:article,
                            ranking:artSearch.ranking,
                            status:artSearch.status,
                            lastUpdate:artSearch.lastUpdate
                        })
                    });
                });
            });

        })