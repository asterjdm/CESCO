<?php
include_once("../config.php");
session_start();
include_once("utils/database.php");

// If post/user isn't present in request
if (!isset($_GET["post_id"]) || !isset($_SESSION["userId"])) {
    echo "Stop HACKING please,,,<br>    <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>MORE INFORMATION</a>";
    exit();
}

$db = new Database();
$postId = $db->escapeStrings($_GET["post_id"]);
$userId = $_SESSION["userId"];
$userGrade = $_SESSION["userGrade"];

if (in_array($userGrade, MODERATOR_GRADES)) {
    $deletePostSqlQuery = "DELETE FROM cesco_posts WHERE ID = '$postId'";
    $db->query($deletePostSqlQuery);
    echo "C'est fait !      <a href='../index.php?page=home'>HOME</a>";
} else {
    echo "Stop HACKING please,,,<br>    <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>MORE INFORMATION</a>";
}

?>