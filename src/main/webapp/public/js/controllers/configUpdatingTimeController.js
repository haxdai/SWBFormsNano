'use strict';

angular.module('controller.configUpdatingTime', ['angular-carousel'])
        .controller('ConfigUpdatingTimeController', function ($scope, Config) {
            $scope.rates = Config.rateUpdate();


            Config.getRateUpdate().then(function (rate) {
                console.log(rate)
                $scope.optionValue = rate;
            }, function (error) {
                Config.saveRateUpdate({rateUpdPubl: $scope.rates[0]}).then(function (rate) {
                    $scope.optionValue = rate;
                })
            })


            $scope.saveConfig = function (rate) {
                $scope.optionValue.rateUpdPubl = rate;
                Config.updateRateUpdate($scope.optionValue).then(function (rate) {
                    $scope.optionValue = rate;
                })
            }

            $("#menu-toggle").click(function (e) {
                  $("#menu-toggle").removeClass("menu-toggle-off-fixed");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");  
                $(this).toggleClass("menu-toggle-off");
                
            });
            checkRezise()
        })