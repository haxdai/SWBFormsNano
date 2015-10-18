<%-- 
    Document   : peticiones
    Created on : 17/10/2015, 06:18:04 PM
    Author     : martha.jimenez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <form action="/SearchResource" method="post">
            <input type="hidden" name="mode" value="addGene">
            <label>Escribe un gen: </label>
            <input type="text" name="gen">
            <!--label>Escribe una alteracion molecular: </label>
            <input type="text" name="altMolecular"-->
            <input type="submit" value="Ir">
        </form>
    </body>
</html>
