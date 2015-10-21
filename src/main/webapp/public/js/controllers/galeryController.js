'use strict';

angular.module('controller.galery', ['angular-carousel'])
        .controller('GaleryController', function ($scope) {
            $scope.galleryImages = [
                {url: "http://lorempixel.com/400/300/sports/1", descripcion: ""},
                {url: "http://lorempixel.com/400/300/sports/2", descripcion: ""},
                {url: "http://lorempixel.com/400/300/sports/3", descripcion: ""},
                {url: "http://lorempixel.com/400/300/sports/5", descripcion: ""},
            ]
        })