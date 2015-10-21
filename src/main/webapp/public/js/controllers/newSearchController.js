'use strict';

angular.module('controller.newSearch', [])
        .controller('NewSearchController', function ($scope,$state, Gene,Alteration,Search) {
            console.log("NewSearchController")
            $scope.geneList;
            $scope.altList;
            
            Gene.list().then(function (geneList) {
                $scope.geneList = geneList;

            })
            Alteration.list().then(function (altList) {
                $scope.altList = altList;

            })
            
            $scope.addSearch = function(geneSelected,altSelected){
                console.log(geneSelected)
                console.log(altSelected)
                Search.add({gene:geneSelected._id,altMolecular:altSelected._id}).then(function(){
                    $state.go('index');
                });
            }
            
        })