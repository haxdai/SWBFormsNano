'use strict';

angular.module('controller.report', ['angular-carousel'])
        .controller('ReportController', function ($scope, $rootScope, $stateParams, Art_Search, Article, Report, Search, Gene, Alteration) {
            $scope.searchId = $stateParams.id;
            $scope.status = 2; /*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado, 4 Recomendado*/
            $scope.report = {};
            $scope.articleList = [];
            $scope.gene;
            $scope.alt;
            var MSG_REPORT_SAVED = "MSG_REPORT_SAVED";
            var MSG_REPORT_UPDATED = "MSG_REPORT_UPDATED";
            
            Search.byId($scope.searchId).then(function (search) {
                Gene.byId(search.gene).then(function (gene) {
                    $scope.gene = gene;
                })
                Alteration.byId(search.alt).then(function (alt) {
                    $scope.alt = alt;
                })
            }, function (error) {
                console.log(error)
            })

            $scope.save = function (report) {
                if ($scope.report.hasOwnProperty("_id")) {
                    Report.update(report).then(function(){
                        showMessage("ok", MSG_REPORT_UPDATED)
                    });
                    
                } else {
                    report.search = $scope.searchId;
                    Report.save(report).then(function(){
                        showMessage("ok", MSG_REPORT_SAVED)
                    });
                    
                }
            }

            function updateResults(searchId, status, orderBy, pag, ele) {
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
                        $scope.articleList.push({article: art, artSearch: art.artSearch})
                    });
                });

            }

            Report.bySearchId($scope.searchId).then(function (report) {
                $scope.report = report;
            }, function (error) {
                console.log(error)
            });


            updateResults($scope.searchId, $scope.status);
            $("#menu-toggle").click(function (e) {
                $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })