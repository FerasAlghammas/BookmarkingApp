<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

// Get the HTTP POST request JSON body
$data = json_decode(file_get_contents('php://input'), true);

// Validate the input JSON body
if (!$data || !isset($data['title']) || !isset($data['link'])) {
    http_response_code(422);
    echo json_encode(array('message' => 'Error: Missing required parameters "title" or "link" in the JSON body'));
    return;
}

// Create a Bookmark item
$Bookmark->setTitle($data['title']);
$Bookmark->setLink($data['link']);

if ($Bookmark->create()) {
    http_response_code(201);
    echo json_encode(array('message' => 'A Bookmark item was created successfully'));
} else {
    http_response_code(500);
    echo json_encode(array('message' => 'Error: Failed to create a Bookmark item'));
}
?>
