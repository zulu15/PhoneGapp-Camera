   <?php

   $latitude = isset($_POST['latitude']) ? $_POST['latitude'] : null;
   $longitude = isset($_POST['longitude']) ? $_POST['longitude'] : null;
   $photo = isset($_POST['photo']) ? $_POST['photo'] : null;


   try {

   	$hostname='mysql.hostinger.com.ar';
   	$username='u315318447_joa';
   	$password='joajoa';
    $date = date('Y-m-d H:i:s');


   	$dbh = new PDO("mysql:host=$hostname;dbname=u315318447_fotos",$username,$password);

	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // <== add this line

	    $statement = $dbh->prepare("INSERT INTO fotos_share(latitude, longitude,foto,fecha)
	    	VALUES(:latitude, :longitude, :foto,:fecha)");
	    
	    $statement->execute(array(
	    	"latitude" => $latitude,
	    	"longitude" => $longitude,
	    	"foto" => $photo,
	    	"fecha" => $date
	    	));

	    print $statement->rowCount();	

	}
	catch(PDOException $e)
	{
		echo $e->getMessage();
	}












	?>