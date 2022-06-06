<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ciudad_games";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn -> connect_error){
	die("Connection failed: ".$conn -> connect_error);
}

echo "Connected successfully <br/>";

?>