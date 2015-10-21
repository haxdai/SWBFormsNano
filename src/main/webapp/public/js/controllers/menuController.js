'use strict';

angular.module('controller.menu', [])
    .controller('MenuController', function($scope,$stateParams,Search){
        $scope.searchList = [];

        Search.list().then(function(data){
             $scope.searchList = data.data;
        },function(error){
            
        });
    })