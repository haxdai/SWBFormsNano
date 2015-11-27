'use strict';

angular.module('controller.report', ['angular-carousel'])
        .controller('ReportController', function ($scope,$filter, $rootScope, $stateParams, Art_Search, Article, Report, Search, Gene, Alteration) {
            $scope.searchId = $stateParams.id;
            $scope.status = 2; /*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado, 4 Recomendado*/
            $scope.report = {};
            $scope.articleList = [];
            $scope.gene;
            $scope.alt;
            $scope.orderBy = "title"
            var MSG_REPORT_SAVED = "The report document has been saved correctly";
            var MSG_REPORT_UPDATED = "The report document has been updated correctly";
            var ERROR_REPORT_EMPTY = "A report without interpretation or without reference documents can not being printed, please provide an interpretation and check if there are documents in accepted documents folder.";
            
            $scope.print = function () {
                if( ! $scope.report.hasOwnProperty("comment") || $scope.articleList.length == 0 ){
                    showMessage("error",ERROR_REPORT_EMPTY);
                }else{
                    window.print();
                }
            }
            
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
                console.log(report)
                report.comment = report.comment.replace(new RegExp("\n", 'g'), '<br>');
                if ($scope.report.hasOwnProperty("_id")) {
                    Report.update(report).then(function(){
                        $scope.report.comment = $filter('formatReport')($scope.report.comment)
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
                $scope.report.comment = $filter('formatReport')($scope.report.comment)
            }, function (error) {
                console.log(error)
            });


            updateResults($scope.searchId, $scope.status,$scope.orderBy);
            $("#menu-toggle").click(function (e) {
                $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })