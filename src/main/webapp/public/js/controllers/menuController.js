'use strict';

angular.module('controller.menu', [])
        .controller('MenuController', function ($scope, $state, $rootScope, $stateParams, Search, Gene, Alteration, Config) {
            $scope.searchList = [];
            $scope.geneList;
            $scope.altList;
            $scope.datesList = Config.publicationDates();
            var MSG_SCHEME_LOOKING = "MSG_SCHEME_LOOKING";
            var MSG_SCHEME_ADDED = "MSG_SCHEME_ADDED"
            
            $scope.searchListFunction = function (list) {
                var filterList = $scope.filterPattern || "";
                return list.filter(function (e) {
                    return filterList.split(",").every(function (f) {
                        var s = e.geneSymbol + " ; " + e.alteName
                        return new RegExp(f.toLowerCase().trim()).test(s.toLowerCase());
                    })
                });
            }

            $rootScope.$on('articleRead', function (event, searchId) {
                $scope.searchList.forEach(function (search, i) {
                    if (search._id === searchId) {
                        $scope.searchList[i].notification--;
                        Search.update($scope.searchList[i]);
                    }

                })
            });
            $rootScope.$on('articleRecommended', function (event, searchId,val ) {
                console.log(event)
                console.log(searchId)
                console.log(val)
                
                $scope.searchList.forEach(function (search, i) {
                    if (search._id === searchId) {
                        $scope.searchList[i].recommended += val;
                        Search.update($scope.searchList[i]);
                    }

                })
            });


            Search.list().then(function (searchList) {
                searchList.forEach(function (search, i) {
                    $scope.searchList.push(search);
                    Gene.byId(search.gene).then(function (gene) {
                        $scope.searchList[i].geneSymbol = gene.symbol;
                    });
                    Alteration.byId(search.altMolecular).then(function (alte) {
                        $scope.searchList[i].alteName = alte.name;
                    });
                });

            }, function (error) {

            });

            Gene.list().then(function (geneList) {
                $scope.geneList = geneList;

            })

            $scope.geneChange = function (gene) {
                console.log(gene)
                Alteration.list(gene._id).then(function (altList) {
                    $scope.altList = altList;
                })
            }


            $scope.addSearch = function (geneSelected, altSelected, dateSelected) {
                var q = {gene: geneSelected._id, altMolecular: altSelected._id, artYearsOld: dateSelected.year};
                showMessage("msg",MSG_SCHEME_LOOKING)
                Search.validate(q).then(function () {
                    Search.add(q).then(function (search) {
                        removeMessage("msg")
                        showMessage("ok", MSG_SCHEME_ADDED)
                        $('#panel-element-busca').collapse("hide");
                        var i = $scope.searchList.push(search.data);
                        Gene.byId(search.data.gene).then(function (gene) {
                            $scope.searchList[i - 1].geneSymbol = gene.symbol;
                        });
                        Alteration.byId(search.data.altMolecular).then(function (alte) {
                            $scope.searchList[i - 1].alteName = alte.name;
                        });
                        $scope.newSearch = false;
                    });
                }, function (error){
                    removeMessage("msg")
                    showMessage("error",error.gene)
                    console.log(error);
                })

            }

        })