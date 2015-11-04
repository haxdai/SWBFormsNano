'use strict';

angular.module('controller.menu', [])
    .controller('MenuController', function($scope,$rootScope,$stateParams,Search,Gene,Alteration){
        $scope.searchList = [];

        $rootScope.$on('articleRead', function(event, searchId) {
             $scope.searchList.forEach(function(search,i){
                 if(search._id === searchId){
                     $scope.searchList[i].notificaction--;
                     Search.update($scope.searchList[i]);
                 }
                 
             })
         });
                 $rootScope.$on('articleRecommended', function(event, searchId, val) {
             $scope.searchList.forEach(function(search,i){
                 if(search._id === searchId){
                     $scope.searchList[i].recommended+= val;
                     Search.update($scope.searchList[i]);
                 }
                 
             })
         });
         
         
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