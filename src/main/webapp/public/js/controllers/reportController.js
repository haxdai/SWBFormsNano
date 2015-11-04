'use strict';

angular.module('controller.report', ['angular-carousel'])
        .controller('ReportController', function ($scope, $rootScope, $stateParams, Art_Search, Article,Report) {
            $scope.searchId = $stateParams.id;
            $scope.status = 2; /*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado, 4 Recomendado*/
            $scope.report = {};
            $scope.articleList = [];

            $scope.save = function(report){
                console.log(report)
                if($scope.report.hasOwnProperty("_id")){
                    Report.update(report);
                }else{
                    report.search = $scope.searchId;
                    Report.save(report);
                }
            }

            
            function updateResults(searchId, status, pag, ele) {
                if ($scope.maxPage) {
                    $scope.maxPage = Math.ceil($scope.totalRows / $scope.limit);
                    if ($scope.maxPage < $scope.pag) {
                        pag = $scope.pag = $scope.maxPage;
                    }
                }
                Art_Search.list(searchId, status, pag, ele).then(function (artSearchList) {
                    artSearchList.data.forEach(function (artSearch) {
                        Article.byId(artSearch.article).then(function (article) {
                            $scope.articleList.push({article: article,
                                artSearch: artSearch
                            })
                        });
                    });
                });

            }
            
            Report.bySearchId( $scope.searchId).then(function(report){
                $scope.report = report;
            },function(error){
                console.log(error)
            });
            
            
            updateResults($scope.searchId, $scope.status);

        })