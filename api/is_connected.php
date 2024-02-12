<?php
header('Content-type: application/json');

include_once("utils/isConnected.php");

echo json_encode(array("connected" => isConnected()));
?>