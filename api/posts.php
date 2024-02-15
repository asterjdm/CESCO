<?php
header('Content-type: application/json');

include_once("utils/isConnected.php");


echo json_encode(getPosts($_GET["id"], $_GET["q"], $_GET["onlyFollowed"], $_GET["userId"], $_GET["sort"]));
?>