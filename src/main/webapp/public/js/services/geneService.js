'use strict';

angular.module('service.gene', [])
        .service('Gene', function ($http, $q, Gene_Cancer) {

            this.validate = function (query) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene");
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
                var ds = eng.getDataSource("Gene");
                ds.fetchObjById(id, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }

                })
                return deferred.promise;
            };
            
            this.listbyCancerType = function (cancerId) {
                var deferred = $q.defer();
                var geneList = [];
                var GeneSrv=this;
                Gene_Cancer.listByCancerId(cancerId).then(function (geneCancerList) {
                    if (geneCancerList) {
                        geneCancerList.forEach(function (geneCancer) {
                            GeneSrv.byId(geneCancer.gene).then(function (gene) {
                                geneList.push(gene);
                                //if (genGeneList.data.length == geneList.length) {
                                //    deferred.resolve(geneList);
                                //}
                            })
                        })
                        //if (genGeneList.data.length == 0) {
                            deferred.resolve(geneList);
                        //}
                    }
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };    

            //deprecated
            this.byCancerType = function (id) {
console.log("geneService.byCancerType0:"+id);                  
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene_Cancer");
                var newGeneList = [];
                ds.fetch({data:{cancer : id}}, function (result) {
                    console.log("*************************************");
                    if (result.status == 0) {
                        var data =result.data;                         
                        data.forEach(function(v){                         
                            var glds = eng.getDataSource("Gene");
                            glds.fetchObjById(v.gene, function (response) {
                                if (response) {                               
                                    newGeneList.push(response);
                                }else{                              
                                } 
                            });                       
                        }); 
                        deferred.resolve(newGeneList);
                        
                    } else {
                        deferred.reject("Server error");
                    }
                });
                return deferred.promise;
            };
            
            this.list = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene");
                ds.fetch({}, function (result) {
                    if (result.status == 0) {
                        deferred.resolve(result.data);
                    } else {
                        deferred.reject("Server error");
                    }
                });
                return deferred.promise;
            };

            this.save = function (gene) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Gene");
                ds.addObj(gene, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    }else  if(response.status == -2){
                        deferred.reject(response.msgError);
                      
                    } else {
                        deferred.reject("No data");
                    }

                });
                return deferred.promise;
            };

        })