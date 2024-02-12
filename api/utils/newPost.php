<?php
include_once(dirname(__FILE__) . "/db.php");


function newPost($content) {
    session_start();
    if(!isset($_SESSION["userID"])) {
        return array("success" => false, "error" => "user not connected");
    }

    $db = new Database;

    $content = $db -> escapeStrings($content);

    if(!isset($content) || strlen(strip_tags($content)) <= 5 || strlen(strip_tags($content)) >= 1500) {
        return array("success" => false, "error" => "error with text length");
    }

    $url = "/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w\- .\/?%&=]*)?/";

    $content = preg_replace($url, "<a target='_blank' href='$0'>$0</a>", $content);

    $ALLOWED_POST_TAGS = array("<u>", "<i>", "<b>", "<img>", "<br>");

    $content = strip_tags($content, implode('', $ALLOWED_POST_TAGS));

    $userId = $db->escapeStrings($_SESSION["userId"]);

    $db -> query("INSERT INTO cesco_posts (content, USER_FK) VALUES ('$content', '$userId')");

    return array("success" => true);
}


?>