'use strict';

angular.module('controller.searchDetail', [])

        .controller('SearchDetailController', function ($scope, $stateParams, Search, Gene, CancerType) {
           
            $scope.gene;
            $scope.searchId = $stateParams.id;
            $scope.cancerList;
            $scope.position = 0;

            Search.byId($scope.searchId).then(function (search) {

                Gene.byId(search.gene).then(function (gene) {
                    $scope.gene = gene;
                    CancerType.listByGenId($scope.gene._id).then(function (cancerList) {
                        $scope.cancerList = cancerList;
                    },
                            function (error) {
                                console.log(error)
                            })
                })
            }, function (error) {
                console.log(error)
            })




            $scope.prev = function () {
                $scope.position--;
            }

            $scope.next = function () {
                $scope.position++;
            }
            
             $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        })