'use strict';

angular.module('controller.menu', ['services'])
    .controller('MenuController', function($scope,Search){
        $scope.searchList = [];
        Search.list().then(function(data){
            console.log(data)
             $scope.searchList = data.data;
        },function(error){
            
        });
    })