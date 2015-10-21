<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="/public/libs/angular-carousel/dist/angular-carousel.min.css" rel="stylesheet" type="text/css" />
        <link href="/public/css/nano.css" rel="stylesheet" type="text/css" />
    </head>
    <body ng-app="NanoApp">
        <div ui-view="menu"></div>
        <div ui-view="content"></div>
    </body>    
    <script src="/swbforms/js/eng.js" type="text/javascript"></script>
     <script type="text/javascript">
            eng.initPlatform("/test/NanoSources.js");
    </script>        
    <script src="/public/libs/angular/angular.min.js" ></script>
    <script src="/public/libs/angular-ui-router/release/angular-ui-router.min.js" ></script>
    <script src="/public/libs/angular-touch/angular-touch.min.js" ></script>
    <script src="/public/libs/angular-carousel/dist/angular-carousel.min.js" ></script>
    
    <script src="/public/js/app.js"></script>
    <script src="/public/js/services/appService.js"></script>
    <script src="/public/js/services/searchService.js"></script>
    <script src="/public/js/services/geneService.js"></script>
    <script src="/public/js/services/alterationService.js"></script>
    <script src="/public/js/controllers/appController.js"></script>
    <script src="/public/js/controllers/menuController.js"></script>
    <script src="/public/js/controllers/galeryController.js"></script>
    <script src="/public/js/controllers/searchDetailController.js"></script>
    <script src="/public/js/controllers/cancerTypeController.js"></script>
    <script src="/public/js/controllers/newSearchController.js"></script>
    
</html>