<?php

$config = array(
    "db" => array(
        "db1" => array(
            "dbname" => "Intelcost_bienes",
            "username" => "root",
            "password" => "",
            "host" => "localhost"
        ),
    )
);

try {
    $dsn = "mysql:host=".$config['db']['db1']['host'].";dbname=".$config['db']['db1']['dbname'];
    return $dbh = new PDO($dsn, $config['db']['db1']['username'], $config['db']['db1']['password']);
} catch (PDOException $e){
    echo $e->getMessage();
}
?>