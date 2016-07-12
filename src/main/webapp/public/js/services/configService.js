'use strict';

angular.module('service.config', [])
        .service('Config', function ($http, $q) {

            this.publicationDates = function () {
                return [{year: 6, text: "6 Months", disabled: ""}, {year: 12, text: "1 Year", disabled: ""}, {year: 24, text: "2 Years", disabled: ""}, {year: 36, text: "3 Years", disabled: "disabled"}, {year: 60, text: "5 Years", disabled: "disabled"}];
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
            
            this.getSearchCreationMode = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Configuration");
                ds.fetchObj({}, function (response) {
                    if (response && response.data.length > 0) {
                        deferred.resolve(response.data[0]);
                    } else {
                        deferred.reject("No data");
                    }
                });
                return deferred.promise;
            };
            
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