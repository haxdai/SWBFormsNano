'use strict';
angular.module('NanoApp', ['hmTouchEvents','controllers', 'services', 'ui.router', 'ngAnimate','userController', "guestDialogController"])

        .run(function () {


        }).config(function ($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {

            $locationProvider.html5Mode({enabled: true, requireBase: false});
            $stateProvider
            .state('index', {
                url: '/',
                views: {
                    "menu": {templateUrl: "/public/templates/menu.html",
                        controller: 'MenuController'
                    },
                    "content": {templateUrl: "/public/templates/galery.html",
                        controller: 'GaleryController'
                    }
                }
            })
            .state('configGen', {
                url: '/config',
                views: {
                    "menu": {templateUrl: "/public/templates/menuConfig.html",
                        controller: 'MenuConfigController'
                    },
                    "content": {
                        templateUrl: "/public/templates/configGen.html",
                        controller: 'ConfigGenController'
                    }
                }
            })
            .state('configUpdatingTime ', {
                url: '/config-time',
                views: {
                    "menu": {templateUrl: "/public/templates/menuConfig.html",
                        controller: 'MenuConfigController'
                    },
                    "content": {
                        templateUrl: "/public/templates/configUpdatingTime.html",
                        controller: 'ConfigUpdatingTimeController'
                    }
                }
            })
           
            .state('genInfo', {
                url: '/search/:id',
                views: {
                    "menu": {templateUrl: "/public/templates/menu.html",
                        controller: 'MenuController'
                    },
                    "content": {templateUrl: "/public/templates/searchDetail.html",
                        controller: 'SearchDetailController'
                    }
                }
            })
            .state('results', {
                url: '/search/results/:id?status',
                views: {
                    "menu": {templateUrl: "/public/templates/menu.html",
                        controller: 'MenuController'
                    },
                    "content": {templateUrl: "/public/templates/results.html",
                        controller: 'ResultsController'
                    }
                }
            })
            .state('report', {
                url: '/search/report/:id',
                views: {
                    "menu": {templateUrl: "/public/templates/menu.html",
                        controller: 'MenuController'
                    },
                    "content": {templateUrl: "/public/templates/report.html",
                        controller: 'ReportController'
                    }
                }
            }).state('configCancerType', {
                url: '/config-cancerType',
                views: {
                    "menu": {templateUrl: "/public/templates/menuConfig.html",
                        controller: 'MenuConfigController'
                    },
                    "content": {templateUrl: "/public/templates/configCancerType.html",
                        controller: 'ConfigCancerTypeController'
                    }
                }
            });
    $urlRouterProvider.otherwise("/");
}) 