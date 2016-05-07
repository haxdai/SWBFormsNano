<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="NanoLogin">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nanopharmacia Diagnóstica</title>
        <!--meta http-equiv="Content-Type" content="text/html; charset=UTF-8"-->
    </head>
    <body class="login valid-this-is-login-view" onload="document.loginForm.email.focus();">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <img src="/public/img/aurora.png">
                    <form method="post" role="form" id="login-form" name="loginForm">
                        <div class="form-group">
                            <div class="row clearfix">
                                <div class="col-xs-3 col-sm-4 col-md-4 col-lg-4 loginlabel">

                                </div>
                                <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4 logininput">
                                    <div id ="alert-login" class="alert alert-danger hidden"></div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-xs-3 col-sm-4 col-md-4 col-lg-4 loginlabel">
                                    <label for="exampleInputEmail1" >Email:</label>
                                </div>
                                <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4 logininput">
                                    <input required type="email" name="email" id="email" class="form-control" placeholder="Email"/>
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
                                    <input required type="password" name="password" id="password" class="form-control" placeholder="Password"/>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-xs-3 col-sm-4 col-md-4 col-lg-4 loginlabel">
                            </div> 
                            <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4 logininput">
                                <input type="submit" value="Sign In"  class="btn btn-primary btn-block btn-flat">                  
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link  href="/public/libs/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/public/dist/style.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="/public/libs/crypto-js/sha512.js" ></script>
    <script type="text/javascript">

        $("#login-form").submit(function (e) {
            e.preventDefault();
            var data={username:$("#email").val(),password:"[SHA-512]" + CryptoJS.SHA512( $("#password").val()).toString()};
            data.operationType="login";
            data = JSON.stringify(data)
            $.post("dslogin?dssp=/public/dist/NanoSources.js", data,function (data){
                                if (data.response.status === -1) {
                    $("#alert-login").text("User or password invalid");
                    $("#alert-login").removeClass("hidden")
                    $("#email").text("");
                    $("#password").text("");
                } else {
                    window.location.href = '/';
                }
            },"json")

        });
    </script>
</html>
