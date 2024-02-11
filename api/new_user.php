<?php
header('Content-type: application/json');

include_once("utils/newUser.php");

$username = $_GET["username"];
$password = $_GET["password"];

echo json_encode(newUser($username, $password));
?>