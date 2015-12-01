'use strict';

angular.module('controller.galery', ['angular-carousel'])
        .controller('GaleryController', function ($scope,Image) {
            $('#c').carousel({
                interval: 3000
            })
            
            $scope.galleryImages = [];  
            Image.list().then(function(imagesList){
                $scope.galleryImages = imagesList;   
            },function(error){
                console.log(error)
            })
            /* [
                {src: "/public/img/imagen-01.jpg", text: "Descripcion de la imagen", title:"Titulo" ,link: "www.google.com"},
                {src: "/public/img/imagen-02.jpg", text: "Descripcion de la imagen", title:"Titulo" ,link: "www.google.com"},
                {src: "/public/img/imagen-03.jpg", text: "Descripcion de la imagen", title:"Titulo" ,link: "www.google.com"}
            ]*/
            $("#menu-toggle").click(function (e) {
                  $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })