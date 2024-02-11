<?php
header('Content-type: application/json');

include_once("utils/connect.php");


$username = $_POST["username"];
$password = $_POST["password"];

echo json_encode(connect($username, $password));
?>