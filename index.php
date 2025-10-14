<!DOCTYPE html>
<html lang="en">
<?php
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    session_start();

    $page = $_GET["p"]; 
    $popup = $_GET["popup"];
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CESCO</title>
    <link rel="stylesheet" type="text/css" href="./style/main.css">
    <link rel="stylesheet" type="text/css" href="./style/home.css">
    <link rel="stylesheet" type="text/css" href="./style/comment.css">
    <link rel="stylesheet" type="text/css" href="./style/sort.css">
    <link rel="stylesheet" type="text/css" href="./style/sign.css">
    <link rel="stylesheet" type="text/css" href="./style/settings.css">
    <link rel="stylesheet" type="text/css" href="./style/about.css">
    <link rel="stylesheet" type="text/css" href="./style/editor.css">
    <link rel="stylesheet" type="text/css" href="./style/component.css">
    <link rel="stylesheet" type="text/css" href="./style/header.css">
    <!-- <link rel="stylesheet" type="text/css" href="style/about.css"> -->


    <script src="script/utils/getSessionInfo.js"></script>
    <script src="script/utils/loadPosts.js"></script>
    <script src="script/utils/loadComments.js"></script>
    <script src="script/utils/postVote.js"></script>
    <script src="script/utils/getUser.js"></script>
    <script src="script/utils/submitComment.js"></script>
    <script src="script/utils/setTheme.js"></script>
    <script defer src="script/utils/report.js"></script>
    <script src="script/utils/follow.js"></script>
    <script src="script/utils/getPosts.js"></script>
    <script src="script/utils/getConfig.js"></script>


    <script src="script/popups.js"></script>

    <script defer src="script/commentsPopup.js"></script>
    <script defer src="script/navbar.js"></script>


    <script defer src="script/index.js"></script>

    <!-- <script defer src="script/newPostChecks.js"></script> -->

</head>

<body>
    <header id="mainHeader" class="main-header">
        <h1 id="mainTitle" class="main-title">cesco</h1>
        <div id="headerSeparator" class="header-separator"></div>


        <div id="headerLinks" class="header-links">
            <?php
                if (!isset($_SESSION["userId"])) {
                    echo '            
                        <a id="headerLink" class="header-link" onclick="openPopup(\'signin-popup\')">Connexion</a>
                        <a id="headerLink" class="header-link" onclick="openPopup(\'signup-popup\')">Inscription</a> ';
                        
                } else {
                    echo '
                        <a id="headerLink" class="header-link" onclick="window.location.href=\'api/disconnect.php\'">Déconnexion</a>
                        <a id="headerLink" class="header-link" onclick="openPopup(\'newPostEditor-popup\')">Nouveau</a>
                        <a id="headerLink" class="header-link" onclick="openPopup(\'settings-popup\')">Paramètres</a>';
                }
            ?>
            <a id="headerLink" class="header-link" onclick="toggleTheme()">Changer de thème</a>

        </div>
                   
        <div id="hamburgerMenu" class="hamburger-menu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>

        

    </header>


    <div id="main">
        <?php
        include_once(__DIR__ . "/pages/popups/comments.html");
        include_once(__DIR__ . "/pages/popups/newPostEditor.html");
        include_once(__DIR__ . "/pages/popups/settings.php");
        include_once(__DIR__ . "/pages/popups/signin.php");
        include_once(__DIR__ . "/pages/popups/signup.php");
        include_once(__DIR__ . "/pages/popups/userPage.html");
        ?>
    </div>
    

    
   


    <?php
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    if ($ip != "127.0.0.1" && $ip != "0.0.0" && $ip != "localhost") {
        if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
            $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            header('HTTP/1.1 301 Moved Permanently');
            header('Location: ' . $location);
            exit();
        }
    }


    // Signup popup
    include_once(__DIR__ . "/pages/popups/signup.php");
    // Signin popup
    include_once(__DIR__ . "/pages/popups/signin.php");
    // Settings popup
    include_once(__DIR__ . "/pages/popups/settings.php");
    // New posts editor popup
    include_once(__DIR__ . "/pages/popups/newPostEditor.html"); # Fix This 
    // Comments popup
    include_once(__DIR__ . "/pages/popups/comments.html");


    if ($page == "home") {
        include_once(__DIR__ . "/pages/home.html");
    } elseif ($page == "about") {
        include_once(__DIR__ . "/pages/about.html");
    } elseif ($page == "user") {
        include_once(__DIR__ . "/pages/user.html");
    } else {
        include_once(__DIR__ . "/pages/home.html");
    }

    if ($popup == "newPost") {
        echo '<script>openPopup("newPostEditor-popup")</script>';
    } elseif ($popup == "signup") {
        echo '<script>openPopup("signup-popup")</script>';
    } elseif ($popup == "signin") {
        echo '<script>openPopup("signin-popup")</script>';
    } elseif ($popup == "settings") {
        echo '<script>openPopup("settings-popup")</script>';
    }
    ?>
 
<footer>
    <p class='footer-credit'>🚀By <a target="_blank" rel="noopener noreferrer" href='https://rmbi.ch/jdm'>JdM (Julien)</a> and <a target="_blank" rel="noopener noreferrer" href='https://rmbi.ch/aster'>Asteroidus (Achille)</a>🌟</p>
</footer>
</body>
</html>
