<?php

include('api_config.php');

include_once("utils/database.php");
include_once("utils/hash.php");
include_once("utils/containBannedWord.php");
include_once("../config.php");

$db = new Database();

if(!isset($_SESSION["userId"])){
    echo json_encode(array("success" => false, "error" => "not connected"));
    exit();
}

$userId = $db->escapeStrings($_SESSION["userId"]);
$username = $db->escapeStrings($_SESSION["userName"]);


if(isset($_POST["username"]) &&  strlen($_POST["username"]) >= 1 && $_POST["username"] != $username){
    $username = $db->escapeStrings(htmlspecialchars($_POST["username"]));

    if (strlen($username) > 15 || strlen($username) <= 0){
        echo json_encode(array("success" => false, "error" => "error"));

        exit();
    }



    if (containBannedWord(BANNED_WORDS_USERNAMES, $username)) {
        echo json_encode(array("success" => false, "error" => "banned username"));

        exit();
    }

    $checkIfUsernameIsAlreadyTakenSqlQuery = "SELECT username FROM cesco_users WHERE username = '$username'";
    $existingUsernames = $db->select($checkIfUsernameIsAlreadyTakenSqlQuery);

    if (count($existingUsernames) > 0) {
        echo json_encode(array("success" => false, "error" => "username already taken"));
        exit();
    }

    $updateUsernameSql = "UPDATE cesco_users SET username='$username' WHERE ID='$userId'";
    $db->query($updateUsernameSql);

}

if(isset($_POST["newPassword"]) &&  strlen($_POST["newPassword"]) >= 1 && isset($_POST["oldPassword"]) &&  strlen($_POST["oldPassword"]) >= 1){
    $newPassword = $db->escapeStrings($_POST["newPassword"]);
    $oldPassword = $db->escapeStrings($_POST["oldPassword"]);

    if (strlen($newPassword) >= 255){
        echo json_encode(array("success" => false, "error" => "error"));
        exit();
    }

    $hashedOldPassword = $db->escapeStrings(hashPassword($oldPassword));

    $getUserSqlPrompt = "SELECT ID FROM cesco_users WHERE ID = '$userId' AND passwd = '$hashedOldPassword'";

    $usersResult = $db->select($getUserSqlPrompt);
    
    if (count($usersResult) == 0) {
        echo json_encode(array("success" => false, "error" => "incorrect password"));

        exit();
    }

    $hashedNewPassword = $db->escapeStrings(hashPassword($newPassword));

    $updatePasswordSql = "UPDATE cesco_users SET passwd='$hashedNewPassword' WHERE ID='$userId'";

    $db->query($updatePasswordSql);

}

if(isset($_FILES["profile_image"])){
    $fullDomain = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
    $profilePict = $_FILES["profile_image"];

    $fileExtension = "png";
    $uniqueFileName =  "pp_$userId." . $fileExtension;

    $target_file = $_SERVER['DOCUMENT_ROOT'] . "/" . TARGET_UPLOAD_PATH . $uniqueFileName;
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
    $fileUrl = $fullDomain . "/" . TARGET_UPLOAD_PATH . $uniqueFileName;

    $check = getimagesize($profilePict["tmp_name"]);

    if ($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }

    if ($profilePict["size"] > MAX_IMAGE_SIZE) {
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        echo json_encode(array("success" => false, "error" => "image error"));
        exit();
    } else {
        // Resize the uploaded image
        $resizedImage = imagecreatefromstring(file_get_contents($profilePict["tmp_name"]));
        $newWidth = PROFILE_IMAGE_WIDTH; // Adjust this value as needed
        $newHeight = PROFILE_IMAGE_WIDTH;
        $resizedImage = imagescale($resizedImage, $newWidth, $newHeight);
        imagejpeg($resizedImage, $target_file);
        imagedestroy($resizedImage);

        if($resizedImage == false){
            echo json_encode(array("success" => false, "error" => "image error"));
            exit();
        }

        $updateProfilePictureImageSql = "UPDATE cesco_users SET profile_picture='$fileUrl' WHERE ID = $userId";
    
        $db->query($updateProfilePictureImageSql);
    }



}

echo json_encode(array("success" => true));
exit();
?>