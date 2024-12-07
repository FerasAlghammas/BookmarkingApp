<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../db/Database.php';
include_once '../models/Bookmark.php';


// Instantiate a Database object and connect
$database = new Database();
$dbConnection = $database->connect();

// Instantiate a Bookmark object
$Bookmark = new Bookmark($dbConnection);

// Read all todo items
$result = $Bookmark->readAll();
if(!empty($result)){
    echo json_encode($result);
} else{
    echo json_encode(array('message' => 'No Bookmark items were found'));
}