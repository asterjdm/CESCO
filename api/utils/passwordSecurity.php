<?php

function hashPassword($password) {
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    return $hashedPassword;
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}
?>