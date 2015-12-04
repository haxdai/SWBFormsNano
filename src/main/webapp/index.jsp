<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nanopharmacia Diagnóstica</title>
        <!--    Lib css     -->
        <link href="/public/libs/bootstrap/dist/css/bootstrap.min.css"  rel="stylesheet" type="text/css" />
        <link href="/public/libs/font-awesome/css/font-awesome.min.css"  rel="stylesheet" type="text/css" />
        <link href="/public/libs/css-spinners/css/spinners.css" rel="stylesheet" type="text/css" />
        <!--    Nano css     -->
        <!--link href="/public/css/nanopharmacia.css" rel="stylesheet" type="text/css" />
        <link href="/public/css/nano.css" rel="stylesheet" type="text/css" /-->
        <link href="/public/dist/style.css" rel="stylesheet" type="text/css" />
        
    </head>
    <body ng-app="NanoApp">
        <div class="query-check"></div>
        <div ng-controller="headerController"  class="top">
            <p ng-bind="user.name" class="user-name"></p>
            <a class="navbar-brand" href="/"><h1>Aurora Nanopharm</h1><img src="/public/img/aurora.png" class="img-responsive" alt="Nanopharmacia Diagnóstica"></a>
            <a href="/login" id="logoout" class="top-config"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> <span class="config">LogOut</span></a>
            <a href="/config" class="top-config"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span> <span class="config">Configure</span></a>
            <a href="/admin" target="_self" ng-hide="user.roleName !== 'admin'"  class="top-config"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> <span class="config">Admin</span></a>
            <a href="/" class="top-config"><span class="glyphicon glyphicon-home" aria-hidden="true"></span> <span class="config">Home</span></a>
        </div>
        <div id="wrapper" class="toggled">
            <div id="sidebar-wrapper" ui-view="menu"></div>
            <div id="page-content-wrapper"  ui-view="content"></div>
        </div>
        <div  class="noprint" id="message-box">
            <div  style="display:none;" class="alert alert-danger text-center">
            </div>
            <div style="display:none;" class="alert alert-success text-center">
            </div> 
            <div style="display:none; padding: 8px 0 0 0;" class="alert alert-info text-center">
            </div>
        </div>
        <div class="container-fluid">
            <div id="x"></div> 
            <div class="row clearfix pie">
                <img src="/public/img/nanopharmacia-blanco.png">
            </div>
        </div> 
    </body>    
    <script src="/swbforms/js/eng.js" type="text/javascript"></script>
    <script type="text/javascript">
               eng.initPlatform("/public/dist/NanoSources.js");
    </script>  
    <!--    Lib js     -->
    <script src="/public/libs/jquery/dist/jquery.min.js" ></script>
    <script src="/public/libs/bootstrap/dist/js/bootstrap.min.js" ></script>
    <script src="/public/libs/angular/angular.min.js" ></script>
    <script src="/public/libs/angular-ui-router/release/angular-ui-router.min.js" ></script>
    <script src="/public/libs/angular-touch/angular-touch.min.js" ></script>
    <script src="/public/libs/angular-carousel/dist/angular-carousel.min.js" ></script>
    <script src="/public/libs/angular-animate/angular-animate.min.js" ></script>
    <script src="/public/libs/angular-sanitize/angular-sanitize.min.js" ></script>
    <!--    Nano js     -->
    <script src="/public/js/app.js"></script>
    <!--    Nano js services     -->
    <script src="/public/js/services/appService.js"></script>
    <script src="/public/js/services/searchService.js"></script>
    <script src="/public/js/services/geneService.js"></script>
    <script src="/public/js/services/alterationService.js"></script>
    <script src="/public/js/services/cancerTypeService.js"></script>
    <script src="/public/js/services/gene-cancerService.js"></script>
    <script src="/public/js/services/art-searchService.js"></script>
    <script src="/public/js/services/articleService.js"></script>
    <script src="/public/js/services/reportService.js"></script>
    <script src="/public/js/services/configService.js"></script>
    <script src="/public/js/services/imagesService.js"></script>
    <script src="/public/js/services/userService.js"></script>
    <script src="/public/js/services/roleService.js"></script>
    <!--    Nano js controllers     -->
    <script src="/public/js/controllers/appController.js"></script>
    <script src="/public/js/controllers/menuController.js"></script>
    <script src="/public/js/controllers/galeryController.js"></script>
    <script src="/public/js/controllers/searchDetailController.js"></script>
    <script src="/public/js/controllers/resultsController.js"></script>
    <script src="/public/js/controllers/reportController.js"></script>
    <script src="/public/js/controllers/configGenController.js"></script>
    <script src="/public/js/controllers/menuConfigController.js"></script>
    <script src="/public/js/controllers/configUpdatingTimeController.js"></script>
    <!--script src="/public/dist/script.js"></script-->
    
    <script type="text/javascript">
                'use strict';
                angular.module('userController', [])
                        .controller("headerController", function ($scope, User, Role) {
                            $scope.user;
                            User.getUser().then(function (user) {
                                $scope.user = user;
                                Role.byId($scope.user.role).then(function (role) {
                                    $scope.user.roleName = role.title;
                                })

                            }, function (error) {

                            });
                        });
    </script>
    <script type="text/javascript">
        function checkRezise() {
            if (parseInt($(".query-check").width()) === 1) { //Escritorio
                $("#wrapper").addClass("toggled");
                $("#menu-toggle").removeClass("menu-toggle-off");
            } else {
                $("#wrapper").removeClass("toggled");
                $("#menu-toggle").addClass("menu-toggle-off-fixed");
                $("#menu-toggle").addClass("menu-toggle-off");

            }
        }
        function showMessage(type, msg) {
            if (type === "ok") {
                $("#message-box > .alert-success").text(msg);
                $("#message-box > .alert-success").fadeIn().delay(3500).fadeOut();

            } else if (type === "error") {
                $("#message-box > .alert-danger").text(msg);
                $("#message-box > .alert-danger").fadeIn().delay(3500).fadeOut();
            } else if (type === "msg") {
                $("#message-box > .alert-info").html("<span  class='throbber-loader'></span><br>" + msg);
                $("#message-box > .alert-info").fadeIn();
            }
        }

        function removeMessage(type) {
            if (type === "ok") {
                $("#message-box > .alert-success").hide();
            } else if (type === "error") {
                $("#message-box > .alert-danger").hide();
            } else if (type === "msg") {
                $("#message-box > .alert-info").hide();
            }
        }


        $(document).on("ready", function () {
            $("#logoout").on("click", function () {
                eng.logout();
                window.location = "/login"
            })

            XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;
            var myOpen = function (method, url, async, user, password) {
                this.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        try {
                            JSON.parse(this.response)
                        } catch (e) {
                            if (this.response.search("valid-this-is-login-view") >= 0) {
                                window.location = "/login"
                            }
                        }
                    }
                }, false);
                this.realOpen(method, url, async, user, password);
            }
            XMLHttpRequest.prototype.open = myOpen;
            $(window).resize(function () {
                checkRezise()
            })
        })
    </script>
</html>
