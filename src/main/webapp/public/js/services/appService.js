'use strict';
angular.module('services',
        [
            'service.search',
            'service.gene',
            'service.alteration',
            'service.cancerType',
            'service.gene-cancer',
            'service.art-search',
            'service.art-search',
            'service.article',
            'service.report',
            'service.config',
        ])
        .filter("sanitize", ['$sce', function ($sce) {
                return function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                }
            }]);