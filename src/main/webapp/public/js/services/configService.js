'use strict';

angular.module('service.config', [])
        .service('Config', function ($http, $q) {

            this.publicationDates = function () {
                return [{year: 1, text: "1 year"}, {year: 3, text: "3 Years"}, {year: 5, text: "5 Years"}, {year: 10, text: "10 Years"}];
            };

            this.rateUpdate = function () {
                return [{day: 1, text: "Daily"}, {day: 7, text: "Every week"}, {day: 15, text: "Every other week"}, {day: 30, text: "Every month"}];
            };

            this.getRateUpdate = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Configuration");
                ds.fetchObj({}, function (response) {
                    if (response && response.data.length > 0) {
                        deferred.resolve(response.data[0]);
                    } else {
                        deferred.reject("No data");
                    }
                })

                return deferred.promise;
            }
            this.saveRateUpdate = function (rate) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Configuration");
                ds.addObj(rate, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }
                });

                return deferred.promise;
            }

            this.updateRateUpdate = function (rate) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Configuration");
                ds.updateObj(rate, function (response) {
                    if (response && response.status == 0) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject("No data");
                    }
                });
                return deferred.promise;
            }
        })