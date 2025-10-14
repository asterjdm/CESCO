<?php
session_start();
include_once("utils/database.php");
include_once("../config.php");
header('Content-Type: application/json; charset=utf-8');

if (!isset($_POST['commentContent']) || !isset($_POST['postId'])) {
    echo json_encode(array("error" => "Parameters error"));
    exit();
}

if(!isset($_SESSION["userId"])){
    echo json_encode(array("error" => "Not connected"));
    exit();
}

if (strlen($_POST['commentContent']) < 2 || strlen($_POST['commentContent']) > MAX_COMMENT_LENGTH) {
    echo "error with comment length <br>";
    echo strlen($_POST['commentContent']);
    exit();
}

$db = new Database();

$commentContent = $db->escapeStrings(htmlspecialchars($_POST['commentContent']));

$postId = $db->escapeStrings($_POST['postId']);


$userId = $db->escapeStrings($_SESSION["userId"]);

$insertNewCommentSqlPrompt = "INSERT INTO cesco_comments (content, USER_FK, POST_FK) VALUES ('$commentContent', '$userId', '$postId')";

$db->query($insertNewCommentSqlPrompt);

echo json_encode(array());
?>