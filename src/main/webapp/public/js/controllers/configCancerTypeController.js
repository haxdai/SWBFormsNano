'use strict';

angular.module('controller.configCancerType', ['angular-carousel'])
        .controller('ConfigCancerTypeController', function ($scope, $stateParams, Gene, Alteration, CancerType, Gene_Cancer) {
            $scope.addingCancerType = false;
            $scope.cancerTypeSelected = false;
            $scope.cancerTypeId;
            $scope.cancerTypeList = [];
            $scope.geneList = [];
            $scope.geneSelected = false;
            $scope.addingAlt = false;
            $scope.editingDisease = false;
//            $scope.geneId;

            $scope.cancelCancerType = function () {
                $scope.addingCancerType = false;
                $scope.cancerTypeForm.$setPristine();
                $scope.cancerType = ""
            }

            $scope.addCancerType = function (cancerType) {
                //Checar si la busqueda ejecutara lo mismo sino crear otro servicio
                var q = {name: cancerType};
                //Revisar que deberia guardarse, validarse
                /* showMessage("msg", MSG_GENE_LOOKING)
                 CancerType.validate(q).then(function () {
                 CancerType.save(q).then(function (newCancerType) {
                 removeMessage("msg")
                 $scope.cancerList.push(newCancerType);
                 $scope.cancelCancerType()
                 showMessage("ok", MSG_GENE_ADDED)
                 }, function (error) {
                 removeMessage("msg")
                 showMessage("error", error)
                 })
                 }, function (error) {
                 removeMessage("msg")
                 showMessage("error", error.symbol)
                 $scope.cancelGen()
                 });*/
            }

            $scope.setCancerType = function (cancer) {
//                $scope.cancelAlt()
//                $scope.cancerDis()
                $scope.cancelCancerType()
                $scope.cancerTypeSelected = true;
                $scope.cancerTypeId = cancer;
                $scope.altList = [];

                Gene.listbyCancerType($scope.cancerTypeId).then(function (geneList) {
                    $scope.geneList = geneList;
                }, function (error) {
                })
            }

            $scope.setGeneC = function (gene) {
                $scope.cancelCancerType()
                $scope.geneSelected = true;
                $scope.geneId = gene;
                Alteration.list($scope.geneId).then(function (altList) {
                    $scope.altList = altList;
                }, function (error) {
                })
            }

            $scope.addGene = function (geneSymbol) {
                console.log("Agregando");
               /* var q = {symbol: geneSymbol};
                showMessage("msg", MSG_GENE_LOOKING)
                Gene.validate(q).then(function () {
                    Gene.save(q).then(function (newGene) {
                        removeMessage("msg")
                        $scope.geneList.push(newGene);
                        $scope.cancelGen()
                        showMessage("ok", MSG_GENE_ADDED)
                    }, function (error) {
                        removeMessage("msg")
                        showMessage("error", error)
                    })
                }, function (error) {
                    removeMessage("msg")
                    showMessage("error", error.symbol)
                    $scope.cancelGen()
                });*/

            }
            
            $scope.cancelGen = function () {
                $scope.addingGen = false;
                $scope.geneForm.$setPristine();
                $scope.geneSymbol = ""
            }
            
            $scope.addAlt = function () {
                $scope.cancelAlt()
                $scope.addingAlt = true;
            }
            
            $scope.cancelAlt = function () {
                $scope.addingAlt = false;
                $scope.editingAlt = false;
                $scope.alterationName = ""
                $scope.aliase = "";
                $scope.altForm.$setPristine();
            }
            
            $scope.addAlteration = function (alterationName, aliase) {
                /*var q = {gene: $scope.geneId, name: alterationName, aliases: aliase};
                Alteration.validate(q).then(function () {
                    Alteration.save({gene: $scope.geneId, name: alterationName, aliases: aliase}).then(function (newAlt) {
                        $scope.altList.push(newAlt);
                        showMessage("ok", MSG_ALT_ADDED)
                        $scope.cancelAlt()
                    }, function (error) {
                    })
                }, function (error) {
                    showMessage("error", error.name)
                    $scope.cancelAlt()
                });*/
            }
            
            $scope.updateAlteration = function (alterationName, aliase) {
                /*$scope.altList[altIndex].name = alterationName;
                $scope.altList[altIndex].aliases = aliase;

                Alteration.update($scope.altList[altIndex]).then(function (newAlt) {
                    $scope.cancelAlt();
                    showMessage("ok", MSG_ALT_EDITED)
                }, function (error) {
                })*/
            }
            
            $scope.editAlt = function (alt) {
                $scope.editingAlt = true;
                $scope.addingAlt = false;
                $scope.alterationName = alt.name
                $scope.aliase = alt.aliases;
                $scope.altList.forEach(function (a, i) {
                    if (a._id == alt._id) {
                        altIndex = i;
                    }
                })
            }
             $scope.removeAlt = function (alt) {
               /* $scope.altList.forEach(function (a, i) {
                    if (a._id == alt._id) {
                        Alteration.remove(alt._id).then(function(){
                             $scope.altList.splice(i, 1);
                             showMessage("ok", MSG_ALT_DELETED)
                        },function(error){
                            showMessage("error", error)
                        });
                    }
                })*/
            }

            CancerType.list().then(function (cancerTypeList) {
                $scope.cancerTypeList = cancerTypeList;
            })
            $("#menu-toggle").click(function (e) {
                $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })

