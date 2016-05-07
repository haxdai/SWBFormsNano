'use strict';

angular.module('controller.galery', ['angular-carousel'])
        .controller('GaleryController', function ($scope,Image,$timeout) {
           
            $scope.galleryImages = [];  
           
            
            Image.list().then(function(imagesList){
                $scope.galleryImages = imagesList;   
            },function(error){
            })
            
            $timeout(function(){
               $('#c').carousel({
                    interval: 10000
                })
            },10000)  //milisegundos para cambiar la imagen mostrada
            
            $("#menu-toggle").click(function (e) {
                  $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })