<?php

session_start();

//echo $_SESSION['usuario']; 

$_SESSION["usuario"] = array();

session_destroy();

header("Location: ../index.html");
