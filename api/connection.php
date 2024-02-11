<?php
header('Content-type: application/json');

include_once("utils/connect.php");


$username = $_GET["username"];
$password = $_GET["password"];

echo json_encode(connect($username, $password));
?>