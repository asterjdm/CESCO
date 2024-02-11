<?php
header('Content-type: application/json');

include_once("utils/newUser.php");

$username = $_POST["username"];
$password = $_POST["password"];

echo json_encode(newUser($username, $password));
?>