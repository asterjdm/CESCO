<?php
header('Content-type: application/json');

include_once("utils/newPost.php");

$content = $_POST["postContent"];

echo json_encode(newPost($content));
?>