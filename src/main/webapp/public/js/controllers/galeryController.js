'use strict';

angular.module('controller.galery', ['angular-carousel'])
        .controller('GaleryController', function ($scope,Image,$timeout) {
           
            $scope.galleryImages = [];  
           
            
            Image.list().then(function(imagesList){
                $scope.galleryImages = imagesList;   
            },function(error){
                console.log(error)
            })
            
            $timeout(function(){
               $('#c').carousel({
                    interval: 3000
                })
            },3000)
            
            $("#menu-toggle").click(function (e) {
                  $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })