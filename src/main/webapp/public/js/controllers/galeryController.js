'use strict';

angular.module('controller.galery', ['angular-carousel'])
        .controller('GaleryController', function ($scope) {
            $scope.galleryImages = [
                {url: "/public/img/imagen-01.jpg", descripcion: ""},
                {url: "/public/img/imagen-02.jpg", descripcion: ""},
                {url: "/public/img/imagen-03.jpg", descripcion: ""}
            ]
            $("#menu-toggle").click(function (e) {
                  $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $(this).toggleClass("menu-toggle-off");
            });
            checkRezise()
        })