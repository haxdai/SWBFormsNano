'use strict';
angular.module('NanoApp', ['controllers','services','ui.router'])

.run(function() { 

}).config(function($urlRouterProvider, $stateProvider,$locationProvider){
   
   $locationProvider.html5Mode({enabled: true,requireBase: false});
    $stateProvider
        .state('index', {  
            url: '/nano',
            views: {
                "menu": {   templateUrl: "nano/templates/menu.html",
                            controller: 'MenuController'
                        },
                "content": { templateUrl: "nano/templates/galery.html",
                            controller: 'GaleryController'
                        }
            }
        });   
    $urlRouterProvider.otherwise("/nano");
    
    
   });
