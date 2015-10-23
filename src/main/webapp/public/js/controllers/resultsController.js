'use strict';

angular.module('controller.results', [])
        .controller('ResultsController', function ($scope, $stateParams, Art_Search,Article) {
            $scope.searchId = $stateParams.id;
            $scope.status = 0;
            $scope.pag = 1;
            $scope.maxPage; 
            
                    
            $scope.articleList =  [];
    
            Art_Search.list($scope.searchId,$scope.status,$scope.pag).then(function(artSearchList){
                $scope.maxPage = Math.ceil(artSearchList.totalRows/artSearchList.limit);
                console.log($scope.maxPage);
                artSearchList.data.forEach(function(artSearch){
                    console.log(artSearch)
                    Article.byId(artSearch.article).then(function(article){
                        $scope.articleList.push({article:article,
                            ranking:artSearch.ranking,
                            status:artSearch.status,
                            lastUpdate:artSearch.lastUpdate
                        })
                        
                    });
                });
            });

        })