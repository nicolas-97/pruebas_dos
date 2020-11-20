<?php

    include './../Models/Dwelling.php';

    if(isset($_GET['all'])){
        echo json_encode(Dwelling::all());
    }

    if(isset($_POST['idFavorite'])){
        Dwelling::addFavoriteDwelling($_POST['idFavorite']);
    }

    if(isset($_GET['favorite'])){
        echo json_encode(Dwelling::AllFavorites());   
    }