<?php

// Start the session
include('api_config.php');

include_once("utils/database.php");
include_once("utils/hash.php");
include_once("utils/containBannedWord.php");
include_once("../config.php");

if (strlen($_POST["username"]) > 15 || strlen($_POST["username"]) <= 0){
    $message = "Une erreur s'est produite.";
    header('Location: ../index.php?popup=signup&message=' . urlencode($message));
    exit();
}

if (strlen($_POST["password"]) > 255){
    $message = "Une erreur s'est produite.";
    header('Location: ../index.php?popup=signup&message=' . urlencode($message));
    exit();
}

// Already logged in (?)
if (!isset($_POST["username"]) || isset($_SESSION["userId"])) {
    $message = "Une erreur s'est produite.";
    header('Location: ../index.php?popup=signup&message=' . urlencode($message));
    exit();
}

if (!preg_match("/[a-z0-9]/i", $_POST["username"])) {
    $message = "Une erreur s'est produite.";
    header('Location: ../index.php?popup=signup&message=' . urlencode($message));
    exit();
}


$db = new Database();

$password = $_POST["password"];
$username = $db->escapeStrings(htmlspecialchars($_POST["username"]));
$hashedPassword = $db->escapeStrings(hashPassword($password));

// Username valid (TODO: espace string so that it only contains latin/number/_ chars)
if (containBannedWord(BANNED_WORDS_USERNAMES, $username)) {
    $message = "Veuillez utiliser un autre nom d'utilisateur.";
    header('Location: ../index.php?popup=signup&message=' . urlencode($message));
    exit();
}

$checkIfUsernameIsAlreadyTakenSqlQuery = "SELECT username FROM cesco_users WHERE username = '$username'";
$existingUsernames = $db->select($checkIfUsernameIsAlreadyTakenSqlQuery);

// Avoid if user already exists
if (count($existingUsernames) > 0) {
    $message = "Ce nom d'utilisateur est déjà pris, veuillez en utiliser un autre.";
    header('Location: ../index.php?popup=signup&message=' . urlencode($message));
    exit();
}

// Actually add user
$insertNewUserSqlPrompt = "INSERT INTO cesco_users (username, passwd, grade, profile_picture) VALUES ('$username', '$hashedPassword', 'user', 'https://rmbi.ch/cesco/images/profileExample.png')";
$db->query($insertNewUserSqlPrompt);

$getUserIdSqlPrompt = "SELECT ID FROM cesco_users WHERE username = '$username' AND passwd = '$hashedPassword'";
$userDbInfo = $db->select($getUserIdSqlPrompt);

// Load data from the created user in the db
if (!empty($userDbInfo)) {
    $userID = $userDbInfo[0]["ID"];
    $userGrade = $userDbInfo[0]["grade"];
    $_SESSION['userID'] = $db->escapeStrings($userID);
    $_SESSION['userGrade'] = $db->escapeStrings($userGrade);
    $_SESSION['userName'] = $db->escapeStrings(htmlspecialchars($username));
    header('Location: ../index.php?p=home');
} else {
    $message = "Une erreur s'est produite lors de la création du compte.";
    header('Location: ../index.php?popup=signup&message=' . urlencode($message));
}

?>