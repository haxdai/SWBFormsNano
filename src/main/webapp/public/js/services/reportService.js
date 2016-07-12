'use strict';

angular.module('service.report', [])
        .service('Report', function ($http, $q) {

            this.byId = function (id) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Report");
                ds.fetchObjById(id, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };

            this.bySearchId = function (searchId) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Report");
                ds.fetchObj({search: searchId}, function (response) {
                    if (response.status == 0) {
                        if (response.data[0]) {
                            deferred.resolve(response.data[0]);
                        } else {
                            deferred.reject("No data");
                        }
                    } else {
                        deferred.reject("Server error");
                    }
                });

                return deferred.promise;
            };

            this.update = function (report) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Report");
                ds.updateObj(report, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };

            this.save = function (report) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Report");
                ds.addObj(report, function (response) {
                    if (response) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            };
        })