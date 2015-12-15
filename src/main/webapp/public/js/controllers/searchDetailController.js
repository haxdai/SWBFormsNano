'use strict';

angular.module('controller.searchDetail', [])

        .controller('SearchDetailController', function ($scope, $stateParams,$state, Search, Gene, CancerType, Alteration, User ,Role) {

            $scope.gene;
            $scope.alt;
            $scope.searchId = $stateParams.id;
            $scope.cancerList;
            $scope.position = 0;
            $scope.search;
            $scope.user;
            User.getUser().then(function (user) {
                $scope.user = user;
                Role.byId($scope.user.role).then(function (role) {
                    $scope.user.roleName = role.title;
                })
            }, function (error) {
                 console.log(error)
            });

            $scope.deleteScheme = function () {
                bootbox.confirm("<h3>This search schema will be deleted permanently. All classification work you did will be erased.\n Do you want to continue?</h3>", function (result) {
                    if(result){
                        Search.remove( $scope.searchId).then(function(data){
                            $state.go('index');
                        })
                    }
                });
            }

            Search.byId($scope.searchId).then(function (search) {
                $scope.search = search;
                Gene.byId(search.gene).then(function (gene) {
                    $scope.gene = gene;
                    CancerType.listByGenId($scope.gene._id).then(function (cancerList) {
                        $scope.cancerList = cancerList;
                    })
                })
                Alteration.byId(search.altMolecular).then(function (alte) {
                    $scope.alt = alte;
                });
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
                $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })