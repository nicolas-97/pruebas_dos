<?php

class Utils{
    public static function loadDataJson(){
        $data =  file_get_contents("./../../data-1.json");
        $dataJson = json_decode($data, true);

        return $dataJson;
    }
}

