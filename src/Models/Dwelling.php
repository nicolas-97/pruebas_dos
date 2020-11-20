<?php

    include './../library/loadDataJson.php';

    class Dwelling{

        public $id;
		public $direccion;
		public $ciudad;
		public $telefono;
		public $codigo_Postal;
		public $tipo;
        public $precio;
        
        public function __construct($id, $direccion, $ciudad, $telefono, $codigo_Postal, $tipo, $precio)
        {
            $this->id = $id;
            $this->direccion = $direccion;
            $this->ciudad = $ciudad;
            $this->telefono = $telefono;
            $this->codigo_Postal = $codigo_Postal;
            $this->tipo = $tipo;
            $this->precio = $precio;

        }

        public static function all()
        {
            $data = Utils::loadDataJson();

            $dwellings = array();

            foreach ($data as $key => $value) {
                $dwellings[$key] = new Dwelling($value['Id'],$value['Direccion'],$value['Ciudad'],$value['Telefono'],$value['Codigo_Postal'],$value['Tipo'],$value['Precio']);
            }

            return $dwellings;

        }

        public static function addFavoriteDwelling($id_json){
            $dbh =include './../config.php';

            $stmt = $dbh->prepare("INSERT INTO dwelling_to_json (id_json_dwelling) VALUES (?)");
            // Bind
            $id_json_dwelling = $id_json;
            $stmt->bindParam(1, $id_json_dwelling);
            // Excecute
            $stmt->execute();
        }

        public static function AllFavorites(){
            $dbh =include './../config.php';
            
            $stmt = $dbh->prepare("SELECT * FROM dwelling_to_json");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }


    }
?>