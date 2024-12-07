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

// Check if the required 'id' parameter is provided
if (!isset($_GET['id'])) {
    http_response_code(422);
    echo json_encode(array('message' => 'Error: Missing required parameter "id".'));
    return;
}

// Set the ID in the Bookmark object
$Bookmark->setId($_GET['id']);

// Attempt to read the bookmark by ID
if ($Bookmark->readOne()) {
    $result = array(
        'id' => $Bookmark->getId(),
        'title' => $Bookmark->getTitle(),
        'link' => $Bookmark->getLink(),
        'dateAdded' => $Bookmark->getDateAdded()
    );
    echo json_encode($result);
} else {
    http_response_code(404);
    echo json_encode(array('message' => 'Error: No such bookmark item found.'));
}

?>
