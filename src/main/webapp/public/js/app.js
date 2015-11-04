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
        }).state('configGen', {  
            url: '/config',
            views: {
                "menu": {   templateUrl: "/public/templates/menuConfig.html",
                            controller: 'MenuConfigController'
                        },
                "content": {
                            templateUrl: "/public/templates/configGen.html",
                            controller: 'ConfigGenController'
                        }
            }
        }).state('configUpdatingTime ', {  
            url: '/config-time',
            views: {
                "menu": {   templateUrl: "/public/templates/menuConfig.html",
                            controller: 'MenuConfigController'
                        },
                "content": {
                            templateUrl: "/public/templates/configUpdatingTime.html",
                            controller: 'ConfigUpdatingTimeController'
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
        }).state('results', {  
           url: '/:id/results',
            views: {
                "menu": {   templateUrl: "/public/templates/menu.html",
                            controller: 'MenuController'
                        },
                "content": { templateUrl: "/public/templates/results.html",
                            controller: 'ResultsController'
                        }
            }
        }).state('report', {  
           url: '/:id/report',
            views: {
                "menu": {   templateUrl: "/public/templates/menu.html",
                            controller: 'MenuController'
                        },
                "content": { templateUrl: "/public/templates/report.html",
                            controller: 'ReportController'
                        }
            }
        });   
    $urlRouterProvider.otherwise("/");
    
    
   });
