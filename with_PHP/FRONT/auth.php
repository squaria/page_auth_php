<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Connection page maintenance</title>
    <link rel="stylesheet" href="style.css" type="text/css" />
</head>

<body>
    <form class="box-login" method="post" action="../BACK/check.php" enctype='multipart/form-data'>
        <input class="box-login__input" name="name" maxlength=32 type="text" placeholder="username"/>
        <input class="box-login__input" name="pass" maxlength=32 type="password" placeholder="password"/>

        <?php
        if (isset($_GET['message'])) {
            echo "<div class=\"box-login__error\">Votre utilisateur ou votre mot de passe est erroné</div>";
        } 
        ?>

        <button class="btn box-login__submit" type="submit">CONNECTION</button>
    </form>
</body>

</html>