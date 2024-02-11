<?php
include_once(dirname(__FILE__) . "/db.php");
include_once(dirname(__FILE__) . "/passwordSecurity.php");


function isUsernameValid($username) {
    return isset($username) && strlen($username) >= 3 && strlen($username) < 15 && preg_match("/^[a-zA-Z0-9]+$/", $username);
}


function isPasswordValid($password) {
    return isset($password) && strlen($password) < 255;
}

function isUsernameAlreadyTaken($username) {
    $db = new Database();
    $safeUsername = $db->escapeStrings($username);
    $existingUsers = $db->select("SELECT username FROM cesco_users WHERE username = '$safeUsername'");

    return count($existingUsers) >= 1;
}

function newUser($username, $password) {
    $db = new Database();

    $safeUsername = $db->escapeStrings($username);

    if (!isUsernameValid($safeUsername)) {
        return array("error" => "invalid username");
    } 
    if (!isPasswordValid($password)) {
        return array("error" => "invalid password");
    }
    if(isUsernameAlreadyTaken($safeUsername)) {
        return array("error" => "username already taken");
    }

    $hashedPassword = hashPassword($password);

    $db -> query("INSERT INTO cesco_users (username, passwd, grade, profile_picture) VALUES ('$safeUsername', '$hashedPassword', 'user', 'profileExample.png')");

    $userInfos = $db->select("SELECT * FROM cesco_users WHERE username = '$safeUsername' AND passwd = '$hashedPassword'");
    $userID = $userInfos[0]["ID"];
    $userGrade = $userInfos[0]["grade"];

    session_start();

    $_SESSION['userID'] = $db->escapeStrings($userID);
    $_SESSION['userGrade'] = $db->escapeStrings($userGrade);
    $_SESSION['username'] = $db->escapeStrings(htmlspecialchars($safeUsername));
    
    return array("success" => true);
}

?>