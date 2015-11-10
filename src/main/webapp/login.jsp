<%-- 
    Document   : login
    Created on : 10/11/2015, 12:00:54 PM
    Author     : martha.jimenez
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="NanoLogin">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
        <script src="/swbforms/js/eng.js" type="text/javascript"></script>
        <script src="/public/libs/angular/angular.min.js" ></script>
        <script src="/public/libs/crypto-js/sha512.js" ></script>
        <script type="text/javascript">
            eng.initPlatform("/test/NanoSources.js");
            eng.dataSourceServlet = "dslogin";
        </script> 
    </head>
    <body ng-controller="loginController">
        <div ng-bind="alert"></div>
        <div class="form-group has-feedback">
            <input name="email" ng-model="email" class="form-control" placeholder="Email"/>
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <input type="password" name="password" ng-model="password" class="form-control" placeholder="Password"/>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
            <div class="col-xs-4">
                <button ng-click="loginUsr(password, email)" class="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        'use strict';
        angular.module('NanoLogin', [])
                .controller("loginController", function($scope, $window) {
                    $scope.loginUsr = function (password, email) {
                        var res = eng.login(email, "[SHA-512]"+ CryptoJS.SHA512(password).toString());
                        if(res.status === -1) {
                            $scope.alert = "Usuario o contraseña inválido";
                        } else {
                            $window.location.href = '/';
                        }
                    }
                });
    </script>
</html>
