<?php
session_start();
include_once("utils/database.php");
include_once("../config.php");

if (!isset($_POST['postEditorTextArea'])) {
    exit();
}


if (!isset($_SESSION["userId"])) {
    header('Location: ../index.php?popup=signin');
    exit();
}

$PostContent = $_POST['postEditorTextArea'];
$fullDomain = isset($_SERVER['HTTPS']) ? "https" : "http" . "://" . $_SERVER['HTTP_HOST'];

if (isset($_FILES["postImage"])) {
    $postImage = $_FILES["postImage"];

    $imageHash = hash_file("sha256", $postImage["tmp_name"]);
    $fileExtension = "png";
    $uniqueFileName = $imageHash . "." . $fileExtension;

    $target_file = $_SERVER['DOCUMENT_ROOT'] . "/" . TARGET_UPLOAD_PATH . $uniqueFileName;
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
    $fileUrl = TARGET_UPLOAD_DIR . $uniqueFileName;

    $check = getimagesize($postImage["tmp_name"]);

    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".<br>";
        $uploadOk = 1;
    } else {
        echo "File is not an image.<br>";
        $uploadOk = 0;
    }

    if ($postImage["size"] > MAX_IMAGE_SIZE) {
        echo "Sorry, the file is too large.<br>";
        echo "File size: " . $postImage["size"] . "<br>";
        echo "Maximum size: " . MAX_IMAGE_SIZE . "<br>";
        $uploadOk = 0;
    }



    if ($uploadOk == 0) {
        echo "<br>Sorry, the file was not uploaded.<br>";
    } else {
        // Resize the uploaded image
        $resizedImage = imagecreatefromstring(file_get_contents($postImage["tmp_name"]));
        $newWidth = POST_IMAGE_WIDTH; // Adjust this value as needed
        $aspectRatio = imagesx($resizedImage) / imagesy($resizedImage);
        $newHeight = $newWidth / $aspectRatio;
        if ($newHeight > ($newWidth * 3)){
            $newHeight = $newWidth * 3;
        }
        $resizedImage = imagescale($resizedImage, $newWidth, $newHeight);
        imagejpeg($resizedImage, $target_file);
        imagedestroy($resizedImage);

        if($resizedImage == false){
            echo "error with resizing image.";
            exit();
        }

        $PostContent .= "<br></br> <img class='postImg' src='$fileUrl' alt='$uniqueFileName'/>";
    }
}

$db = new Database();


$sanitizedPostContent = strip_tags($PostContent, implode('', ALLOWED_POST_BALISE));

// transform content link into html <a>
$url = "/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w\- .\/?%&=]*)?/";
$sanitizedPostContent = preg_replace($url, "<a target='_blank' href='$0'>$0</a>", $sanitizedPostContent);


$cleanPostContent = $db->escapeStrings($sanitizedPostContent);

if (strlen(strip_tags($PostContent)) < 2 || strlen(strip_tags($PostContent)) > MAX_POSTS_LENGTH) {
    echo "Error with post length <br>";
    echo strlen($PostContent);
    exit();
}

$userId = $db->escapeStrings($_SESSION["userId"]);

$insertNewPostSqlPrompt = "INSERT INTO cesco_posts (content, USER_FK) VALUES ('$cleanPostContent', '$userId')";

$db->query($insertNewPostSqlPrompt);

header('Location: ../index.php?p=home');
?>
