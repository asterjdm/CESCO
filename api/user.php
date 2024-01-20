<?php
    include('api_config.php');

    header('Content-Type: application/json; charset=utf-8');
    include_once("utils/database.php");


    $db = new Database();


    $getUserInfosSql = "SELECT ID, username, grade, profile_picture FROM cesco_users";

    if(isset($_GET["id"])){
        $userId = $_GET["id"];
        $getUserInfosSql .= " WHERE ID = '$userId'";
    }

    $userInfo = $db -> select($getUserInfosSql);

    for ($i=0; $i < count($userInfo); $i++) {
        $userId = $userInfo[$i]["ID"];

        $getUserFollowingSql = "SELECT followed_id as followed_user_id from cesco_followers WHERE follower_id = $userId";
        $userFollowing = $db -> select($getUserFollowingSql);
        $userInfo[$i]["following"] = $userFollowing;

        $getUserFollowersSql = "SELECT follower_id as follower_user_id from cesco_followers WHERE followed_id = $userId";
        $userFollowing = $db -> select($getUserFollowingSql);
        $userInfo[$i]["followers"] = $userFollowing;

    }
    
    if(count($userInfo) <= 1){
        $userInfo = $userInfo[0];
    }

    echo json_encode($userInfo);

?>
