'use strict';

angular.module('controller.guestDialog', [])
    .controller('DialogController', function ($scope) {
        
    $scope.dialogShown = false;
    
//    $scope.addGuest = function(guest) {
//        console.log("Parametros: " + guest.name + " - " + guest.specialty + " - " + guest.company + " - " + guest.email + " - " + guest.comment);
//        $scope.dialagShown = false;
//    }

    console.log("En DialogController--");
})
