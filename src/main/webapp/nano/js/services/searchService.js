'use strict';

angular.module('service.search', [])
    .service('Search', function($http,$q){
        this.list = function(){
            var deferred = $q.defer();
            var ds = eng.getDataSource("Search");
            deferred.resolve(ds.fetch({}));
            return deferred.promise;
        };
    })