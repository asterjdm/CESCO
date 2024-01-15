<?php

include('api_config.php');
session_destroy();
echo "<script>window.close();</script>";
?>