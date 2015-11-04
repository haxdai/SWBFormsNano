'use strict';

angular.module('controller.configGen', [])

        .controller('ConfigGenController', function ($scope, $stateParams, Gene,Alteration,CancerType,Gene_Cancer) {
            $scope.geneSelected = false;
            $scope.geneList = [];
            $scope.geneId;
            $scope.altList = [];
            $scope.cancerList = [];
            
            $scope.addGene = function(geneSymbol){
                Gene.save({symbol:geneSymbol}).then(function (newGene){
                    $scope.geneList.push(newGene);
                },function(error){
                    console.log(error);
                })
            }
            
            $scope.addAlteration = function (alterationName,aliase){
               Alteration.save({gene:$scope.geneId,name:alterationName,aliases:aliase}).then(function (newAlt){
                    $scope.altList.push(newAlt);
                },function(error){
                    console.log(error);
                })
                
            }
            
            $scope.addDisease = function(dideaseName,diseaseSummary){
                CancerType.save({name:dideaseName,summary:diseaseSummary}).then(function(newCancer){
                    Gene_Cancer.save({gene:$scope.geneId,cancer:newCancer._id}).then(function(newGeneCancer){
                         $scope.cancerList.push(newCancer);
                    })
                })
            }
            
            
            $scope.setGenId = function (geneId) {
                $scope.geneSelected = true;
                $scope.geneId = geneId;
                Alteration.list( $scope.geneId).then(function(altList){
                     $scope.altList = altList;
                },function(error){
                    console.log(error)
                })
                CancerType.listByGenId($scope.geneId).then(function(cancerList){
                  $scope.cancerList = cancerList;
                  console.log($scope.cancerList);
                },function(error){
                    console.log(error)
                })
            }

            Gene.list().then(function (geneList) {

                $scope.geneList = geneList;
                console.log($scope.geneList)
            })

        })