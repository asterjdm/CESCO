<?php
function hashPassword($passwordString) {
    include_once("../config.php");
    return hash("sha256", $passwordString . HASH_SECRET);
}

?>