<?php

include('api_config.php');
header('Content-Type: application/json');

echo json_encode(["connected" => isset($_SESSION["userId"])]);
?>