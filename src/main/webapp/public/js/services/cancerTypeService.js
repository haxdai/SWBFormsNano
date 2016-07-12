'use strict';

angular.module('service.cancerType', [])
        .service('CancerType', function ($http, $q, Gene_Cancer) {

            this.validate = function (query) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                ds.validateObj(query, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.errors);
                    }
                });

                return deferred.promise;
            }

            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                ds.fetchObjById(id, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };

            this.listByGenId = function (idGene) {
                var CancerType = this;
                var deferred = $q.defer();
                var cancerList = [];
                Gene_Cancer.listbyGeneId(idGene).then(function (genCancerList) {
                    if (genCancerList && genCancerList.status == 0) {
                        genCancerList.data.forEach(function (genCancer) {
                            CancerType.byId(genCancer.cancer).then(function (cancer) {
                                cancerList.push(cancer);
                                if (genCancerList.data.length == cancerList.length) {
                                    deferred.resolve(cancerList);
                                }
                            })
                        })
                        if (genCancerList.data.length == 0) {
                            deferred.resolve(cancerList);
                        }
                    }

                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            this.list = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                ds.fetch({}, function (result) {
                    if (result && result.status == 0) {
                        deferred.resolve(result.data);
                    } else {
                        deferred.reject("Server error");
                    }
                });
                return deferred.promise;
            };

            this.save = function (cancer) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                ds.addObj(cancer, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }
                });
                return deferred.promise;
            };

            this.update = function (cancer) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("CancerType");
                ds.updateObj(cancer,function(response){
                       if (response && response.status == 0) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject("No data");
                }
                });
                return deferred.promise;
            };


        })