<?php
session_start();
header('Content-Type: application/json');

include_once("../config.php");

$userId = $_SESSION["userId"];
$userName = $_SESSION["userName"];
$userGrade = $_SESSION["userGrade"];
$isModerator = in_array($userGrade, MODERATOR_GRADES);
$infoArray = ["userId" => $userId, "userName" => $userName, "userGrade" => $userGrade, "isModerator" => $isModerator];
echo json_encode($infoArray);
?>