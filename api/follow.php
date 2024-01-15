<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');
include_once("utils/database.php");
include('api_config.php');


if (!isset($_POST["id"])){
    http_response_code(400);
    echo json_encode(array("message" => "post('id') is not defined"));
    exit();
}

if(!isset($_SESSION["userId"])){
    http_response_code(401);
    echo json_encode(array("message" => "user is not connected"));
    exit();
}
$id = $_POST["id"];
$userId = $_SESSION["userId"];

$db = new Database();

$getUserFollowing = "SELECT * FROM cesco_followers WHERE follower_id = '$userId' AND followed_id = '$id' LIMIT 1";
$userFollowing = $db -> select($getUserFollowing)[0];

if(count($userFollowing) >= 1){
    $removeFollowingSql = "DELETE FROM cesco_followers WHERE follower_id = '$userId' AND followed_id = '$id' LIMIT 1";
    $db -> query($removeFollowingSql);

    http_response_code(200);
    echo json_encode(array("message" => "follow-up has been deleted"));

    exit();

} else {
    $insertFollowingSql = "INSERT INTO cesco_followers (follower_id, followed_id) VALUES ('$userId', '$id')";

    http_response_code(200);
    echo json_encode(array("message" => "successfully followed"));
    
    $db -> query($insertFollowingSql);
}
?>