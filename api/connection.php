<?php

include('api_config.php');
include_once("utils/database.php");
include_once("utils//hash.php");

if (!isset($_POST["username"])) {
    exit();
}

$db = new Database();

$password = $_POST["password"];
$username = $db->escapeStrings(htmlspecialchars($_POST["username"]));
$hashedPassword = $db->escapeStrings(hashPassword($password));

$getUserSqlPrompt = "SELECT ID, grade FROM cesco_users WHERE username = '$username' AND passwd = '$hashedPassword'";

$usersResult = $db->select($getUserSqlPrompt);

if (count($usersResult) == 0) {
    echo json_encode(['success' => false]);
    exit();
}

$_SESSION['userName'] = $db->escapeStrings(htmlspecialchars($username));
$_SESSION["userId"] = $db->escapeStrings($usersResult[0]['ID']);
$_SESSION["userGrade"] = $db->escapeStrings($usersResult[0]['grade']);
echo json_encode(['success' => true]);
// header('Location: ../index.php?p=home');
// exit();
?>