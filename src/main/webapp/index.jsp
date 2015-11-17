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
        <link href="/public/libs/angular-carousel/dist/angular-carousel.min.css" rel="stylesheet" type="text/css" />
        <!--    Nano css     -->
        <link href="/public/css/nano.css" rel="stylesheet" type="text/css" />
        <link href="/public/css/nanopharmacia.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript">

        </script>
    </head>
    <body ng-app="NanoApp">
        <div class="query-check"></div>
        <div class="top">
            <a class="navbar-brand col-xs-7 col-xs-9 col-md-9 col-lg-7" href="/"><h1>Aurora Nanopharm</h1><img src="/public/img/aurora.png" class="img-responsive" alt="Nanopharmacia Diagnóstica"></a>
            <a href="#" class="top-config"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> <span class="config">LogOut</span></a>
            <a href="/config" class="top-config"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> <span class="config">Configure</span></a>
            <!--div class="btn-group">
                <button class="btn btn-default top-config" data-toggle="dropdown">
                    <span aria-hidden="true" class="glyphicon glyphicon-cog"></span> <span class="hidden-xs">Configure</span> <span class="caret"></span>
                </button> 
                <ul class="dropdown-menu">
                    <li><a href="#">Gene list</a></li>
                    <li><a href="#">Updating settings</a></li>
                </ul>
            </div-->
        </div>
        <!--a href="/">Home</a>
        <a href="/config">Configure</a-->
        <div id="wrapper" class="toggled">
            <div id="sidebar-wrapper" ui-view="menu"></div>
            <div id="page-content-wrapper"  ui-view="content"></div>
        </div>
        <div class="container-fluid">
            <div id="x"></div> 
            <div class="row clearfix pie">
                <img src="/public/img/nanopharmacia-blanco.png">
                <p>01 800 910 6266 <a href="contacto@nanopharmacia.com">contacto@nanopharmacia.com</a>
                </p>
            </div>
        </div> 
    </body>    
    <script src="/swbforms/js/eng.js" type="text/javascript"></script>
    <script type="text/javascript">
            eng.initPlatform("/test/NanoSources.js");

    </script>  
    <!--    Lib js     -->
    <script src="/public/libs/jquery/dist/jquery.min.js" ></script>
    <script src="/public/libs/bootstrap/dist/js/bootstrap.min.js" ></script>
    <script src="/public/libs/angular/angular.js" ></script>
    <script src="/public/libs/angular-ui-router/release/angular-ui-router.min.js" ></script>
    <script src="/public/libs/angular-touch/angular-touch.min.js" ></script>
    <script src="/public/libs/angular-carousel/dist/angular-carousel.min.js" ></script>
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
    <script type="text/javascript">
         function checkRezise() {
                    console.log($(".query-check").width())
                    if (parseInt($(".query-check").width()) === 1) { //Escritorio
                        $("#wrapper").addClass("toggled");
                        $("#menu-toggle").removeClass("menu-toggle-off");
                    }else{
                        $("#wrapper").removeClass("toggled");
                        $("#menu-toggle").addClass("menu-toggle-off-fixed");
                        $("#menu-toggle").addClass("menu-toggle-off");
                        
                    }
            }
            $(document).on("ready", function () {
                
               
                $(window).resize(function(){checkRezise()})
           
            })
    </script>
</html>