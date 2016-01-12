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
                    ID: "usersGrid",
                    width: "97%",
                    height: "200px",
                    canEdit: true,
                    canRemove: true,
                    canAdd: true,
                    canPrint: false,
                    removeData: function (record, p1, p2, p3) {
                        isc.ask("Remove this user?", function (value) {
                            if (value) {
                                var obj = eng.findObject("usersGrid");
                                obj.removeSelectedData(record);
                                return true;
                            }
                        })
                    }
                }, "User");
            </script>
            <h2>Image's administration</h2>
            <script type="text/javascript">
                eng.initPlatform("/public/dist/NanoSources.js");
                var imageForm = eng.createForm({
                    ID: "formImages",
                    width: "97%",
                    height: "100px",
                    showTabs: false,
                    winEdit: false,
                    fields: [
                        {name: "title"},
                        {name: "text"},
                        {name: "link"},
                        {name: "src"},
                    ],
                }, "", "Images");
                var images = eng.createGrid({
                    ID: "imgsGrid",
                    width: "97%",
                    height: "200px",
                    canEdit: true,
                    canPrint: false,
                    canRemove: true,
                    fields: [
                        {name: "title"},
                        {name: "text"},
                        {name: "src"},
                        {name: "link"},
                    ],
                    removeData: function (record, p1, p2, p3) {
                        isc.ask("Remove this image?", function (value) {
                            if (value) {
                                var obj = eng.findObject("imgsGrid");
                                obj.removeSelectedData(record);
                                return true;
                            }
                        })
                    }
                }, "Images");
            </script>
            <!--
            <script type="text/javascript">
                eng.initPlatform("/public/dist/NanoSources.js");
                var search = eng.createGrid({
                    width: "97%",
                    height: "200px",
                    canEdit: true,
                    canPrint: false,
                    canRemove: true
                 }, "Search");
            </script>
            -->
        </div>
    </body>    
    <!--    Lib js     -->
    <script src="/public/libs/jquery/dist/jquery.min.js" ></script>
    <script src="/public/libs/bootstrap/dist/js/bootstrap.min.js" ></script>
</html>