'use strict';

angular.module('controller.menu', [])
    .controller('MenuController', function($scope,$stateParams,Search,Gene,Alteration){
        $scope.searchList = [];

        Search.list().then(function(searchList){
            searchList.forEach(function(search, i){
                $scope.searchList.push(search);
                Gene.byId(search.gene).then(function(gene){
                    $scope.searchList[i].geneSymbol = gene.symbol;
                });
                Alteration.byId(search.altMolecular).then(function(alte){
                    $scope.searchList[i].alteName = alte.name;
                });
            });
             
             
        },function(error){
            
        });
    })