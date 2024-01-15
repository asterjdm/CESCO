<?php

include('api_config.php');
include_once("utils/database.php");
header('Content-Type: application/json; charset=utf-8');

if (!(isset($_POST["post_id"]) && isset($_POST["type"]) && (int) $_POST["type"] <= 2 && (int) $_POST["type"] >= 0)) {
    echo json_encode(array("error" => "Parameters error"));
    exit();
}
if (!isset($_SESSION["userId"])) {
    echo json_encode(array("error" => "User not logged in"));
    exit();
}

$db = new Database();
$userId = $db->escapeStrings($_SESSION["userId"]);
$voteType = (int) $_POST["type"];
$postId = (int) $_POST["post_id"];

$verifyIfAlreadyLikedSqlQuery = "SELECT * FROM cesco_votes WHERE USER_FK = '$userId' AND POST_FK='$postId' AND vote_type = '$voteType'";
$verifyIfAlreadyLikedResult = $db->select($verifyIfAlreadyLikedSqlQuery);

$voteActionSqlQuery = (count($verifyIfAlreadyLikedResult) == 0) ?
    "INSERT INTO cesco_votes (vote_type, USER_FK, POST_FK) VALUES ('$voteType', '$userId', '$postId')" :
    "DELETE FROM cesco_votes WHERE USER_FK = '$userId' AND POST_FK='$postId' AND vote_type = '$voteType'";

$db->query($voteActionSqlQuery);

$getAllVotes = "SELECT * FROM cesco_votes WHERE USER_FK = '$userId' AND POST_FK='$postId' AND vote_type = '$voteType'";
$allVotes = $db->select($verifyIfAlreadyLikedSqlQuery);

echo json_encode(array("votes_count" => sizeof($allVotes)));
?>