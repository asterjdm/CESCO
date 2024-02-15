<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-type: application/json');

include_once("utils/getPosts.php");


echo json_encode(getPosts($_GET["id"], $_GET["q"], $_GET["onlyFollowed"], $_GET["userId"], $_GET["sort"]));
?>