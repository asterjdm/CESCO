<?php
include('api_config.php');

include_once("../config.php");
header('Content-Type: application/json; charset=utf-8');

$data = array("max_posts_length" => MAX_POSTS_LENGTH,
    "post_image_width" => POST_IMAGE_WIDTH,
    "banned_words_usernames" => BANNED_WORDS_USERNAMES
);

echo json_encode($data);
?>