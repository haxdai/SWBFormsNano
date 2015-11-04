'use strict';

angular.module('service.config', [])
        .service('Config', function ($http, $q) {

            this.publicationDates = function () {
                return [1, 3, 5, 10];
            };

            this.rateUpdate = function () {
                return ["Daily", "Every week", "Every other week", "Every month"];
            };

            this.getRateUpdate = function () {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Configuration");
                var response = ds.fetchObj({})
                if (response && response.data.length>0) {
                    deferred.resolve(response.data[0]);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            }
            this.saveRateUpdate = function (rate) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Configuration");
                var response = ds.addObj(rate);
                if (response && response.status == 0) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            }

            this.updateRateUpdate = function (rate) {
                var deferred = $q.defer();
                var ds = eng.getDataSource("Configuration");
                var response = ds.updateObj(rate);
                if (response && response.status == 0) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject("No data");
                }
                return deferred.promise;
            }
        })