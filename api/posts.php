<?php

include('api_config.php');
header('Content-Type: application/json; charset=utf-8');
require_once("utils/database.php");

$db = new Database();




$baseSqlQuery = "SELECT cesco_posts.*, cesco_users.username AS author, 
    cesco_users.profile_picture AS author_profile_picture,
    cesco_users.grade AS author_grade,
    COALESCE(SUM(cesco_votes.vote_type = 2), 0) AS votes_positives_count,
    COALESCE(SUM(cesco_votes.vote_type = 1), 0) AS votes_neutrals_count,
    COALESCE(SUM(cesco_votes.vote_type = 0), 0) AS votes_negatives_count
    FROM cesco_posts
    JOIN cesco_users ON cesco_posts.USER_FK = cesco_users.ID
    LEFT JOIN cesco_votes ON cesco_posts.ID = cesco_votes.POST_FK";



if (isset($_GET["id"])) {
    $postID = $db->escapeStrings($_GET["id"]);
    $getPostByIdSql = $baseSqlQuery . " WHERE cesco_posts.ID = '$postID' GROUP BY cesco_posts.ID";
    $postData = $db->select($getPostByIdSql);

    if ($postData) {
        $getCommentsSql = "SELECT cc.*, cu.username AS author, cu.profile_picture AS author_profile_picture,
        cu.grade AS author_grade FROM cesco_comments AS cc JOIN cesco_users AS cu ON cc.USER_FK = cu.ID WHERE cc.POST_FK = '$postID'";
        $comments = $db->select($getCommentsSql);
        $postData[0]['comments'] = $comments;
        echo json_encode($postData);
    } else {
        echo json_encode(["error" => "Post not found."]);
    }

} else {
 
    if (isset($_GET["q"]) || isset($_GET["userId"]) || isset($_GET["onlyFollowed"]) ) {
        $baseSqlQuery .= " WHERE ";
        if (isset($_GET["q"])) {
            $searchQuery = $db->escapeStrings($_GET["q"]);
            $baseSqlQuery .= "(cesco_posts.content LIKE '%$searchQuery%' OR cesco_users.username LIKE '%$searchQuery%')";
        }
        if (isset($_GET["userId"])) {
            if (isset($_GET["q"])) {
                $baseSqlQuery .= " AND ";
            }
            $userId = $db->escapeStrings($_GET["userId"]);
            $baseSqlQuery .= "cesco_posts.USER_FK = '$userId'";
        }
        if (isset($_GET["onlyFollowed"])) {
            if(isset($_SESSION["userId"])){
                if (isset($_GET["q"]) || isset($_GET["userId"])) {
                    $baseSqlQuery .= " AND ";
                }
                $userId = $_SESSION["userId"];            
                $userId = $db->escapeStrings($_SESSION["userId"]);
                $baseSqlQuery .= "cesco_posts.USER_FK IN (SELECT followed_id FROM cesco_followers WHERE follower_id = $userId)";
            }else {
                $baseSqlQuery .= "1";
            }
        }
    }
    

    $sortby = isset($_GET["sort"]) ? $_GET["sort"] : "";
    switch ($sortby) {
        case "positiveVotes":
            $orderBy = "votes_positives_count DESC";
            break;
        case "oldest":
            $orderBy = "cesco_posts.ID";
            break;
        case "positive":
            $orderBy = "SUM(cesco_votes.vote_type = 2) - SUM(cesco_votes.vote_type = 0) DESC";
            break;
        case "random":
            $orderBy = "RAND()";
            break;
        default:
            $orderBy = "cesco_posts.ID DESC";
    }


    $getAllPostsSql = $baseSqlQuery . " GROUP BY cesco_posts.ID ORDER BY $orderBy";
    $data = $db->select($getAllPostsSql);

    foreach ($data as &$post) {
        $postID = $post['ID'];
        $getCommentsSql = "SELECT cc.*, cu.username AS author, cu.profile_picture AS author_profile_picture,
        cu.grade AS author_grade FROM cesco_comments AS cc JOIN cesco_users AS cu ON cc.USER_FK = cu.ID WHERE cc.POST_FK = '$postID'";
        $comments = $db->select($getCommentsSql);
        $post['comments'] = $comments;
    }

    echo json_encode($data);
}
?>
