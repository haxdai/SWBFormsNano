<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="NanoLogin">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nanopharmacia Diagnóstica</title>
        <!--meta http-equiv="Content-Type" content="text/html; charset=UTF-8"-->
        <link href="/public/libs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link  href="/public/libs/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <link href="/public/css/nanopharmacia.css" rel="stylesheet">

        <script src="/swbforms/js/eng.js" type="text/javascript"></script>
        <script src="/public/libs/angular/angular.min.js" ></script>
        <script src="/public/libs/crypto-js/sha512.js" ></script>
        <script type="text/javascript">
            eng.initPlatform("/test/NanoSources.js");
            eng.dataSourceServlet = "/dslogin";
        </script> 
    </head>
    <body ng-controller="loginController" class="login valid-this-is-login-view">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <img src="/public/img/aurora.png">
                    <form role="form">
                        <div class="form-group">
                            <div class="row clearfix">
                                 <div class="col-xs-3 col-sm-4 col-md-4 col-lg-4 loginlabel">
                
                                </div>
                                 <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4 logininput">
                                     <div ng-show="alert" class="alert alert-danger" ng-bind="alert"></div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-xs-3 col-sm-4 col-md-4 col-lg-4 loginlabel">
                                    <label for="exampleInputEmail1" >Email:</label>
                                </div>
                                <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4 logininput">
                                    <input required type="email" name="email" ng-model="email" class="form-control" placeholder="Email"/>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row clearfix">
                                <div class="col-xs-3 col-sm-4 col-md-4 col-lg-4 loginlabel">
                                    <label for="exampleInputPassword1" >
                                        Password:
                                    </label>
                                </div> 
                                <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4 logininput">
                                    <input required type="password" name="password" ng-model="password" class="form-control" placeholder="Password"/>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-xs-3 col-sm-4 col-md-4 col-lg-4 loginlabel">
                            </div> 
                            <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4 logininput">
                                <button ng-click="loginUsr(password, email)" class="btn btn-primary btn-block btn-flat">Sign In</button>                     
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        'use strict';
        angular.module('NanoLogin', [])
                .controller("loginController", function ($scope, $window) {
                    $scope.loginUsr = function (password, email) {
                        if (password && email) {
                            eng.login(email, "[SHA-512]" + CryptoJS.SHA512(password).toString(), function (res) {
                                if (res.status === -1) {
                                    $scope.alert = "User or password invalid";
                                    $scope.$digest()
                                } else {
                                    $window.location.href = '/';
                                }
                            });

                        }
                    }
                });
    </script>
    <script src="/public/libs/jquery/dist/jquery.min.js" ></script>
    <script src="/public/libs/bootstrap/dist/js/bootstrap.min.js" ></script>
</html>
