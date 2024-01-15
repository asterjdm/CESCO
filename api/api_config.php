<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


// session_config.php

if (!session_id()) {
    session_start();
}

// Configurer les options du cookie de session
session_set_cookie_params([
    'samesite' => 'None', // Permet le partage entre domaines
    'secure' => true, // Assure que le cookie est transmis uniquement via HTTPS
    'httponly' => true, // Empêche l'accès au cookie via JavaScript
]);
?>