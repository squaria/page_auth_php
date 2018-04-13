<?php
if (isset($_POST["name"]) && isset($_POST["pass"])) {
    $name = $_POST["name"];
    $pass = hash('sha256',$_POST["pass"]);

    if ($name != '' && $pass != '') {
	
        try { $pdo = new PDO('mysql:host=localhost;dbname=prj_auth;charset=utf8', 'root', 'root'); }
		catch (Exeption $e) { die('Erreur : ' .$e->getMessage())  or die(print_r($pdo->errorInfo())); }

        $req = $pdo->prepare("SELECT count(*) FROM user WHERE user_name= ? AND user_pass= ?");
		$req->execute(array($name, $pass));
		$result = $req->fetchColumn();
		
			if($result == 1) {
            	echo "<script>window.location.href='../FRONT/index.php'</script>";
        	}
        	else {
            	echo "<script>window.location.href='../FRONT/auth.php?message=erreur'</script>";
        	}
    }
    else {
        echo "<script>window.location.href='../FRONT/auth.php?message=erreur'</script>";
    }
}


else {
    echo "rien du tout !";
}
?>