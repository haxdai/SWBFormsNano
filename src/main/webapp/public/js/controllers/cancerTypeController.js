'use strict';

angular.module('controller.cancerType', [])
    .controller('CancerTypeController', function($scope,$stateParams,Search,CancerType){
        //console.log($scope.gene)
        $scope.cancerList;
        $scope.position = 0;
        CancerType.listByGenId($scope.gene._id).then(function(cancerList){
            $scope.cancerList = cancerList;    
            console.log($scope.cancerList)
        },
        function(error){
           console.log(error) 
        })
        
        $scope.prev = function(){
            $scope.position--;
        }
        
        $scope.next = function(){
            $scope.position++;
         }
    })