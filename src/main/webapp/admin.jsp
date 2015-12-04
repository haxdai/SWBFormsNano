<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nanopharmacia Diagnóstica</title>
        <!--    Lib css     -->
        <link href="/public/libs/font-awesome/css/font-awesome.min.css"  rel="stylesheet" type="text/css" />
        <!--    Nano css     -->
        <link href="/public/dist/styleAdmin.css" rel="stylesheet" type="text/css" />
    </head>
    <body ng-app="NanoApp">
        <div class="top-admin">
            <a class="" ><img src="/public/img/aurora.png" class="img-responsive" alt="Nanopharmacia Diagnóstica"></a>
            <a href="/login" id="logoout" class="top-config"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> <span class="config">LogOut</span></a>
            <a href="/" class="top-config"><span class="glyphicon glyphicon-home" aria-hidden="true"></span> <span class="config">Home</span></a>
        </div>
        <script src="/swbforms/js/eng.js" type="text/javascript"></script>
        <div class="container">
            <h2>User's administration</h2>
            <script type="text/javascript">
                  eng.initPlatform("/public/dist/NanoSources.js");
                eng.createGrid({
                    width: "97%",
                    height: "200px",
                    canEdit: true,
                    canRemove: true,
                    canAdd: true,
                    canPrint: false,
                }, "User");
            </script>
            <h2>Image's administration</h2>
            <script type="text/javascript">
               eng.initPlatform("/public/dist/NanoSources.js");
               var imageForm = eng.createForm({
                    width: "97%",
                    height: "100px",
                    showTabs: false,
                    winEdit:false,
//                    canPrint:false,
//                    winPrint: false,
                    fields: [
                        {name: "title"},
                        {name: "text"},
                         {name: "link"},
                        {name: "src"},
                    ],
                }, "","Images");
                var images = eng.createGrid({
                    width: "97%",
                    height: "200px",
                    canEdit: true,
                    canPrint: false,
                    //canAdd:true,
                    canRemove: true,
                    fields: [
                        {name: "title"},
                        {name: "text"},
                        {name: "src"},
                        {name: "link"},
                    ]
                }, "Images");
            </script>
        </div>
    </body>    
    <!--    Lib js     -->
    <script src="/public/libs/jquery/dist/jquery.min.js" ></script>
    <script src="/public/libs/bootstrap/dist/js/bootstrap.min.js" ></script>
</html>