<?php 

class Database{
    private $dbHost;
    private $dbPort;
    private $dbName;
    private $dbUser;
    private $dbPassword;
    private $dbConnection;


    public function __construct(){

        //read database credentials as environment variables why?? to ensure that no one see them 
        $this-> dbHost = getenv('DB_Host');
        $this-> dbPort = getenv('DB_PORT');
        $this-> dbName = getenv('DB_DATABASE');
        $this-> dbUser = getenv('DB_USERNAME');
        $this-> dbPassword = getenv('DB_PASSWORD');

        if(!$this-> dbHost || !$this-> dbPort || !$this-> dbName || !$this-> dbUser || !$this-> dbPassword ){
            die('Please set database credentials as environment variables.');
        };
    }


public function connect(){  // How to do a connection to the db using PDO

    try{

        $this->dbConnection = new PDO(
            'mysql:host=' . $this->dbHost . ';port='.$this->dbPort . ';dbname='.$this->dbName, $this->dbUser, $this->dbPassword
        );
        $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        die('Connection Error '. $e->getMessage());
    }
    return $this->dbConnection;
    
    }
}