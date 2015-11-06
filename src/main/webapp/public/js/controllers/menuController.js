'use strict';

angular.module('controller.menu', [])
        .controller('MenuController', function ($scope, $state, $rootScope, $stateParams, Search, Gene, Alteration, Config) {
            $scope.searchList = [];
            $scope.geneList;
            $scope.altList;
            $scope.datesList = Config.publicationDates();
            
            $rootScope.$on('articleRead', function (event, searchId) {
                $scope.searchList.forEach(function (search, i) {
                    if (search._id === searchId) {
                        $scope.searchList[i].notificaction--;
                        Search.update($scope.searchList[i]);
                    }

                })
            });
            $rootScope.$on('articleRecommended', function (event, searchId, val) {
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


            $scope.addSearch = function (geneSelected, altSelected,dateSelected) {

                Search.add({gene: geneSelected._id, altMolecular: altSelected._id,artYearsOld:dateSelected.year}).then(function (search) {
                    var i = $scope.searchList.push(search.data);
                    Gene.byId(search.gene).then(function (gene) {
                        $scope.searchList[i-1].geneSymbol = gene.symbol;
                    });
                    Alteration.byId(search.altMolecular).then(function (alte) {
                        $scope.searchList[i-1].alteName = alte.name;
                    });
                    $scope.newSearch = false;
                });
            }
        })