'use strict';

angular.module('controller.searchDetail', [])
        .controller('SearchDetailController', function ($scope, $stateParams, Search, Gene) {
            $scope.gene;
            $scope.searchId = $stateParams.id;
            Search.byId($scope.searchId).then(function (search) {
                Gene.byId(search.gene).then(function(gene){
                  $scope.gene = gene;  
                  console.log(gene)
                })
            },function(error){
                console.log(error)
            })
        })