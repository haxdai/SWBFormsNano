'use strict';
angular.module('NanoApp', ['controllers','services','ui.router'])

.run(function() { 

}).config(function($urlRouterProvider, $stateProvider,$locationProvider){
   
   $locationProvider.html5Mode({enabled: true,requireBase: false});
    $stateProvider
       .state('index', {  
            url: '/',
            views: {
                "menu": {   templateUrl: "/public/templates/menu.html",
                            controller: 'MenuController'
                        },
                "content": { templateUrl: "/public/templates/galery.html",
                            controller: 'GaleryController'
                        }
            }
        })
        .state('newSearch', {  
            url: '/new-search',
            views: {
                "menu": {   templateUrl: "/public/templates/menu.html",
                            controller: 'MenuController'
                        },
                "content": {
                            templateUrl: "/public/templates/newSearch.html",
                            controller: 'NewSearchController'
                        }
            }
        })
        .state('genInfo', {  
            url: '/:id',
            views: {
                "menu": {   templateUrl: "/public/templates/menu.html",
                            controller: 'MenuController'
                        },
                "content": { templateUrl: "/public/templates/searchDetail.html",
                            controller: 'SearchDetailController'
                        }
            }
        }).state('genInfo.cancerType', {  
            url: '/cancer-type',
            templateUrl: "/public/templates/cancerType.html",
            controller: 'CancerTypeController'
        });   
    $urlRouterProvider.otherwise("/");
    
    
   });
