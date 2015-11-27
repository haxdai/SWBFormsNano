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

        <link href="/public/css/nanopharmacia.css" rel="stylesheet" type="text/css" />
        <link href="/public/css/nano.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript">

        </script>
    </head>
    <body ng-app="NanoApp">
        <div class="query-check"></div>
        <div class="top">
            <a class="navbar-brand col-xs-7 col-xs-9 col-md-9 col-lg-7" href="/"><h1>Aurora Nanopharm</h1><img src="/public/img/aurora.png" class="img-responsive" alt="Nanopharmacia Diagnóstica"></a>
            <a href="/login" id="logoout" class="top-config"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> <span class="config">LogOut</span></a>
            <a href="/imgcarousel" class="top-config"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> <span class="config">Images</span></a>
            <a href="/" class="top-config"><span class="glyphicon glyphicon-home" aria-hidden="true"></span> <span class="config">Home</span></a>
        </div>
        <script src="/swbforms/js/eng.js" type="text/javascript"></script>
        <div id="wrapper" class="toggled" style="padding-left: 0px;height: inherit">
            <div style="width: 100%; height: inherit">

                <h1>User's administration</h1>
                <script type="text/javascript">
            eng.initPlatform("/test/NanoSources.js");
            eng.createGrid({
                /*left: "300",*/
                /*margin: "10px",*/
                position: "relative",
                width: "100%",
                height: "100%",
                canEdit: true,
                canRemove: true,
                canAdd: true,
                fields: [
                    {name: "name"},
                    {name: "email"},
                    {name: "password"},
                    {name: "rol"},
                ]
            }, "User");

                </script>
            </div>
        </div>
    </body>    

    <!--    Lib js     -->
    <script src="/public/libs/jquery/dist/jquery.min.js" ></script>
    <script src="/public/libs/bootstrap/dist/js/bootstrap.min.js" ></script>
</html>