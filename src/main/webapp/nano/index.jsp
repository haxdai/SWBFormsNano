<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body ng-app="NanoApp">
        <p>hola</p>
        <div ui-view="menu"></div>
        <div ui-view="content"></div>
    </body>    
    <script src="/swbforms/js/eng.js" type="text/javascript"></script>
     <script type="text/javascript">
            eng.initPlatform("/test/NanoSources.js");
    </script>        
    <script src="libs/angular/angular.min.js" ></script>
    <script src="libs/angular-ui-router/release/angular-ui-router.min.js" ></script>
    <script src="js/app.js"></script>
    <script src="js/services/appService.js"></script>
    <script src="js/services/searchService.js"></script>
    <script src="js/controllers/appController.js"></script>
    <script src="js/controllers/menuController.js"></script>
    <script src="js/controllers/galeryController.js"></script>
</html>