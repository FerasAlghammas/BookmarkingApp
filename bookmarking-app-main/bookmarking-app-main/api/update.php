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

// Get the HTTP PUT request JSON body
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$data || !isset($data['id']) || !isset($data['title']) || !isset($data['link'])) {
    http_response_code(422);
    echo json_encode(array('message' => 'Error: Missing required parameters "id", "title", or "link" in the JSON body'));
    return;
}

// Update the bookmark item
$Bookmark->setId($data['id']);
$Bookmark->setTitle($data['title']);
$Bookmark->setLink($data['link']);

if ($Bookmark->update()) {
    echo json_encode(array('message' => 'The bookmark item was updated successfully'));
} else {
    http_response_code(500);
    echo json_encode(array('message' => 'Error: The bookmark item was not updated'));
}

?>
