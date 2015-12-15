'use strict';
angular.module('services',
        [
            'service.search',
            'service.gene',
            'service.alteration',
            'service.cancerType',
            'service.gene-cancer',
            'service.art-search',
            'service.article',
            'service.report',
            'service.config',
            'service.images',
            'service.user',
            'service.role'
        ])
        .filter("sanitize", ['$sce', function ($sce) {
                return function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                }
            }]) 
        .filter("formatPrint", [ function () {
                return function (text) {
                    if (text)
                    return text.replace(new RegExp("\n", 'g'), "<br>");
                    return ""
                }
            }]) 
        .filter("formatReport", [ function () {
                return function (text) {
                    if (text)
                    return text.replace(new RegExp("<br>", 'g'), "\n");
                    return ""
                }
            }]);