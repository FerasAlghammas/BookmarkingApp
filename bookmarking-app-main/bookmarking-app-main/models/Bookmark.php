<?php

class Bookmark
{
    private $id;
    private $link;
    private $title;
    private $date_added;
    private $dbConnection;
    private $dbTable = 'bookmarks';

    public function __construct($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    // Getters
    public function getId()
    {
        return $this->id;
    }

    public function getLink()
    {
        return $this->link;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getDateAdded()
    {
        return $this->date_added;
    }

    // Setters
    public function setId($id)
    {
        $this->id = $id;
    }

    public function setLink($link)
    {
        $this->link = $link;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function setDateAdded($date_added)
    {
        $this->date_added = $date_added;
    }

    // Fetch a single bookmark by ID
    public function readOne()
    {
        $query = "SELECT * FROM " . $this->dbTable . " WHERE id = :id LIMIT 1";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute() && $stmt->rowCount() == 1) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $result['id'];
            $this->title = $result['title'];
            $this->link = $result['link'];
            $this->date_added = $result['date_added'];
            return true;
        }
        return false;
    }


    public function readAll()
{
    $query = "SELECT * FROM " . $this->dbTable;
    $stmt = $this->dbConnection->prepare($query);
    $stmt->execute();
    
    $bookmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($bookmarks)) {
        return $bookmarks;
    }
    return [];
}


public function create()
    {
        $query = "INSERT INTO ".$this->dbTable." (title, link, date_added) VALUES (:title, :link, NOW());";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":link", $this->link);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s\n", $stmt->errorInfo()[2]);
        return false;
    }


public function update()
{
    $query = "UPDATE " . $this->dbTable . " 
              SET title = :title, link = :link 
              WHERE id = :id";
    $stmt = $this->dbConnection->prepare($query);
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':link', $this->link);

    if ($stmt->execute() && $stmt->rowCount() == 1) {
        return true;
    }
    return false;
}


public function delete()
{
    $query = "DELETE FROM " . $this->dbTable . " WHERE id = :id";
    $stmt = $this->dbConnection->prepare($query);
    $stmt->bindParam(':id', $this->id);

    if ($stmt->execute() && $stmt->rowCount() == 1) {
        return true;
    }
    return false;
}



}
?>
