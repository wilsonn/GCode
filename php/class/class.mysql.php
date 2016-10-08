<?php

class mysql {

    private $Conexion = null;
    //private $Ddb;
    private $liberar = false;

    //private $resultado;
    //private $stmt;

    public function __construct() {
        //$this->Conexion = new mysqli('localhost', 'root', '', 'gcode') or die("Note: " . mysqli_connect_error());
        $this->Conexion = new mysqli('localhost', 'root', '', 'gcode') or die("<p id='1'>Note: " . mysqli_connect_error()."</p>");
        $this->liberar = true;
    }

    public function __destruct() {
        if ($this->liberar) {
            $this->desconectar();
        }
    }

    public function desconectar() {
        if ($this->liberar) {
            if ($this->Conexion) {
                mysqli_close($this->Conexion);
                $this->Conexion = null;
            }
        }
        $this->liberar = false;
    }

    public function Execute_procedure($query) {
        if (mysqli_multi_query($this->Conexion, $query)) {
            do {
                $result = mysqli_store_result($this->Conexion);
                return $result; 
                //$this->sql->liberar_resultado($result);
                //$this->sql->desconectar();
            } while (mysqli_next_result($this->Conexion));
        }
        else{
            return "error";
        }    
    }

    public function num_rows($resultado) {
        //$num_filas=0;
        $num_filas = mysqli_num_rows($resultado);
        return $num_filas;
    }

    public function fetch_array($query) {
        $fila = mysqli_fetch_array($query, MYSQLI_BOTH);
        mysqli_next_result($this->Conexion);
        return $fila;
    }

    public function liberar_resultado($result) {
        mysqli_free_result($result);
    }

    public function iniciar_transaccion(){
        $this->Conexion->autocommit(FALSE);
    }

    public function terminar_transaccion(){
        $this->Conexion->autocommit(TRUE);   
    }

    public function aceptar_transaccion(){
        $this->Conexion->commit();   
    }

    public function cancelar_transaccion(){
        $this->Conexion->rollback();
    }

}

?>