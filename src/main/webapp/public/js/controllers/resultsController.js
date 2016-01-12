'use strict';

angular.module('controller.results', [])
        .controller('ResultsController', function ($scope, $rootScope, $stateParams, Art_Search, Article, Search, Gene, Alteration,Glossary) {
            $scope.searchId = $stateParams.id;
            var MSG_ACEPTED_DOCUMENT = "The document has been moved to accepted documents folder";
            var MSG_ACEPTED_DOCUMENT = "The document has been moved to accepted documents folder";
            var ERROR_SCHEME_NOT_FOUND = "This scheme of search was not found"
            var KEYWORD_ADDED = "The keyword has been added correctly";
            var status = parseInt($stateParams.status);
            if ($stateParams.status >= 0 && $stateParams.status <= 4) {
                $scope.status = status;
            } else {
                $scope.status = 4; /*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado, 4 Recomendado*/
            }

            $scope.statuslist = ["Unclassified documents", "New documents", "Accepted documents", "Rejected documents", "Recommended documents"];

            $scope.pag = 1;
            $scope.maxPage;
            $scope.totalRows;
            $scope.totalRowsFinal;
            $scope.sortBy = "-ranking";
            $scope.limit;
            $scope.gene;
            $scope.alt;
            $scope.search;
            $scope.reorderClass = "glyphicon-sort-by-attributes";
            $scope.isReorderToggle = false;
            $scope.articleList = [];
            $scope.filterSelected = "ranking"

            Search.byId($scope.searchId).then(function (search) {
                $scope.search = search;
                Gene.byId(search.gene).then(function (gene) {
                    $scope.gene = gene;
                })
                Alteration.byId(search.altMolecular).then(function (alte) {
                    $scope.alt = alte;
                });

            }, function (error) {
                $scope.search = undefined;
                showMessage("error", ERROR_SCHEME_NOT_FOUND);
            })

            $scope.prev = function () {
                if ($scope.status !== 1) {
                    if ($scope.pag > 1) {
                        $scope.pag--;
                    }
                }
                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.status != 1 ? $scope.pag : 1);
            }
            $scope.firts = function () {
                $scope.pag = 1;

                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.status != 1 ? $scope.pag : 1);
            }
            $scope.last = function () {
                $scope.pag = $scope.maxPage;
                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.status != 1 ? $scope.pag : 1);
            }

            $scope.next = function () {
                if ($scope.status !== 1) {
                    if ($scope.pag < $scope.maxPage) {
                        $scope.pag++;
                    }
                }
                $scope.articleList = [];
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.status != 1 ? $scope.pag : 1);
            }

            $scope.discard = function (art_search, i, index) {
                var statusPrev = art_search.status;
                art_search.status = 3;
                Art_Search.update(art_search).then(function () {
                    $('#p' + (i)).on('hidden.bs.collapse', function () {
                        $('#p' + (i)).off('hidden.bs.collapse')
                        $scope.articleList.splice(index, 1);
                        $scope.$digest()
                    })
                    $('#p' + (i)).collapse("hide");

                    $scope.maxPage = Math.ceil(--$scope.totalRows / $scope.limit);
                    $scope.totalRowsFinal--;
                    if (art_search.ranking > 5 ) {
                        $rootScope.$emit('articleRecommended', $scope.searchId, -1);
                    }
                    if (statusPrev == 1 &&  $scope.status == 1) {

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

            $scope.accept = function (art_search, i, index) {
                var statusPrev = art_search.status;
                art_search.status = 2;
                Art_Search.update(art_search).then(function (data) {
                    console.log(data)
                     if (data.data.newRecommended > 0) {
                        $rootScope.$emit('articleRecommended', $scope.searchId, data.data.newRecommended);
                    }
                    $('#p' + (i)).on('hidden.bs.collapse', function () {
                        $('#p' + (i)).off('hidden.bs.collapse')
                        $scope.articleList.splice(index, 1);
                        $scope.$digest()
                    })
                    $('#p' + (i)).collapse("hide");
                    $scope.maxPage = Math.ceil(--$scope.totalRows / $scope.limit);
                    $scope.totalRowsFinal--;
                    if (art_search.ranking > 5) {
                        $rootScope.$emit('articleRecommended', $scope.searchId, -1);
                    }
                    if (statusPrev == 1 &&  $scope.status == 1) {
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

            $scope.filterToogle = function (newReorderToggle, filter) {
                if (newReorderToggle) {
                    $scope.isReorderToggle = false;
                    $scope.reorderClass = "glyphicon-sort-by-attributes-alt";
                } else {
                    $scope.isReorderToggle = true;
                    $scope.reorderClass = "glyphicon-sort-by-attributes";

                }
                if ($scope.isReorderToggle) {
                    filter = "-" + filter
                }
                $scope.articleList = [];
                $scope.pag = 1;
                $scope.sortBy = filter;
                $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);
            }

            $scope.filterChange = function () {
                if ($scope.filterSelected == "titleSort" || $scope.filterSelected == "autorSort") {
                    $scope.filterToogle(true, $scope.filterSelected)
                } else {
                    $scope.filterToogle(false, $scope.filterSelected)
                }

            }


            $scope.updateResults = function (searchId, status, orderBy, pag, ele) {
                if ($scope.maxPage) {
                    $scope.maxPage = Math.ceil($scope.totalRows / $scope.limit);
                    if ($scope.maxPage < $scope.pag) {
                        pag = $scope.pag = $scope.maxPage;
                    }
                }
                Article.listBySearchId(searchId, status, orderBy, pag, ele).then(function (artSearchList) {

                    $scope.totalRowsFinal = $scope.totalRows = artSearchList.totalRows;
                    $scope.limit = artSearchList.limit;
                    $scope.maxPage = Math.ceil($scope.totalRows / $scope.limit);
                    artSearchList.data.forEach(function (art) {
                        if (art.artSearch.status == 1) {
                            if (art.artSearch.ranking > 5) {
                                art.artSearch.status = 4;
                            } else {
                                  $scope.totalRows--;
                                art.artSearch.status = 0;
                            }
                            $rootScope.$emit('articleRead', $scope.searchId);

                            //$scope.totalRows--;
                            Art_Search.update(art.artSearch)
                            art.artSearch.status = 1;
                        }
                        $scope.articleList.push({article: art, artSearch: art.artSearch})
                    });
                }, function (error) {
                    if (error == "No data") {
                        //$scope.maxPage = 0;
                    }
                });

            }


            $scope.updateResults($scope.searchId, $scope.status, $scope.sortBy, $scope.pag);

            $("#menu-toggle").click(function (e) {
                $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });

            $(document).ready(function () {
                context.init({
                    fadeSpeed: 100,
                    filter: function ($obj) {
                    },
                    above: 'auto',
                    preventDoubleContext: false,
                    compress: false
                });
                context.attach('.article-abstact', [{
                        text: "Add to glosary",
                        action: function (e) {
                            var key = window.getSelection().getRangeAt(0).toString();
                            console.log(key);
                            e.preventDefault();
                            var q = {key: key};
                            Glossary.validate(q).then(function () {
                                Glossary.save(q).then(function (newKey) {
                                    showMessage("ok", KEYWORD_ADDED)
                                }, function (error) {
                                    showMessage("error", error)
                                })
                            }, function (error) {
                                    showMessage("error", error.key)
                            });

                           
                            
                        }
                    }]);
            });



            checkRezise();
        })