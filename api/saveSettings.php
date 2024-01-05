<?php

session_start();

include_once("utils/database.php");
include_once("utils/hash.php");
include_once("utils/containBannedWord.php");
include_once("../config.php");

$db = new Database();

if(!isset($_SESSION["userId"])){
    header('Location: ../index.php?popup=signin');
    exit();
}

$userId = $db->escapeStrings($_SESSION["userId"]);
$username = $db->escapeStrings($_SESSION["userName"]);


if(isset($_POST["username"]) &&  strlen($_POST["username"]) >= 1 && $_POST["username"] != $username){
    $username = $db->escapeStrings(htmlspecialchars($_POST["username"]));

    if (strlen($username) > 15 || strlen($username) <= 0){
        $message = "Une erreur s'est produite.";
        header('Location: ../index.php?popup=settings&message=' . urlencode($message));
        exit();
    }



    if (containBannedWord(BANNED_WORDS_USERNAMES, $username)) {
        $message = "Veuillez utiliser un autre nom d'utilisateur.";
        header('Location: ../index.php?p=settings&message=' . urlencode($message));
        exit();
    }

    $checkIfUsernameIsAlreadyTakenSqlQuery = "SELECT username FROM cesco_users WHERE username = '$username'";
    $existingUsernames = $db->select($checkIfUsernameIsAlreadyTakenSqlQuery);

    if (count($existingUsernames) > 0) {
        $message = "Ce nom d'utilisateur est déjà pris, veuillez en utiliser un autre.";
        header('Location: ../index.php?popup=settings&message=' . urlencode($message));
        exit();
    }

    $updateUsernameSql = "UPDATE cesco_users SET username='$username' WHERE ID='$userId'";
    $db->query($updateUsernameSql);

}

if(isset($_POST["newPassword"]) &&  strlen($_POST["newPassword"]) >= 1 && isset($_POST["oldPassword"]) &&  strlen($_POST["oldPassword"]) >= 1){
    $newPassword = $db->escapeStrings($_POST["newPassword"]);
    $oldPassword = $db->escapeStrings($_POST["oldPassword"]);

    if (strlen($newPassword) < 8 || strlen($newPassword) >= 255){
        $message = "Une erreur s'est produite. ";
        header('Location: ../index.php?popup=settings&message=' . urlencode($message));
        exit();
    }

    $hashedOldPassword = $db->escapeStrings(hashPassword($oldPassword));

    $getUserSqlPrompt = "SELECT ID FROM cesco_users WHERE ID = '$userId' AND passwd = '$hashedOldPassword'";

    $usersResult = $db->select($getUserSqlPrompt);
    
    if (count($usersResult) == 0) {
        $message = "Ancien mot de passe incorrect.";
        header('Location: ../index.php?popup=settings&message=' . urlencode($message));
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

    $target_file = $_SERVER['DOCUMENT_ROOT'] . "/" . TARGET_UPLOAD_DIR . $uniqueFileName;
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
    $fileUrl = $fullDomain . "/" . TARGET_UPLOAD_DIR . $uniqueFileName;

    $check = getimagesize($profilePict["tmp_name"]);

    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".<br>";
        $uploadOk = 1;
    } else {
        echo "File is not an image.<br>";
        $uploadOk = 0;
    }

    if ($profilePict["size"] > MAX_IMAGE_SIZE) {
        echo "Sorry, the file is too large.<br>";
        echo "File size: " . $profilePict["size"] . "<br>";
        echo "Maximum size: " . MAX_IMAGE_SIZE . "<br>";
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        echo "<br>Sorry, the file was not uploaded.<br>";
    } else {
        // Resize the uploaded image
        $resizedImage = imagecreatefromstring(file_get_contents($profilePict["tmp_name"]));
        $newWidth = PROFILE_IMAGE_WIDTH; // Adjust this value as needed
        $newHeight = PROFILE_IMAGE_WIDTH;
        $resizedImage = imagescale($resizedImage, $newWidth, $newHeight);
        imagejpeg($resizedImage, $target_file);
        imagedestroy($resizedImage);

        if($resizedImage == false){
            echo "error with resizing image.";
            exit();
        }

        $updateProfilePictureImageSql = "UPDATE cesco_users SET profile_picture='$fileUrl' WHERE ID = $userId";
    
        $db->query($updateProfilePictureImageSql);
    }



}

$message = "Les paramètres ont été mis à jour !";
header('Location: ../index.php?popup=settings&message=' . urlencode($message));
?>