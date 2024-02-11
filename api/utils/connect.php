<?php
include_once(dirname(__FILE__) . "/db.php");
include_once(dirname(__FILE__) . "/passwordSecurity.php");

function checkCredentials($username, $password) {
    $db = new Database();
    $safeUsername = $db -> escapeStrings($username);

    $users = $db -> select("SELECT * from cesco_users WHERE username = '$safeUsername'");

    if (count($users) <= 0) {
        return false;
    }

    $user = $users[0];

    return verifyPassword($password, $user["passwd"]);
}

function connect($username, $password) {
    $db = new Database();

    $safeUsername = $db -> escapeStrings($username);

    if (!checkCredentials($safeUsername, $password)) {
        return array("success" => false, "error" => "incorrect password");
    }

    $userInfos = $db->select("SELECT * FROM cesco_users WHERE username = '$safeUsername'");
    $userID = $userInfos[0]["ID"];
    $userGrade = $userInfos[0]["grade"];

    session_start();

    $_SESSION['userID'] = $db->escapeStrings($userID);
    $_SESSION['userGrade'] = $db->escapeStrings($userGrade);
    $_SESSION['username'] = $db->escapeStrings(htmlspecialchars($safeUsername));
    
    return array("success" => true);
}


?>