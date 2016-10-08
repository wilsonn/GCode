<?php

class persona {

    function persona() {
        $this->sql = new mysql();
    }

    function ver_datos_persona($idpersona) {
        $result = $this->sql->Execute_procedure("CALL persona_ver_datos('$idpersona')");
        $fila = $this->sql->fetch_array($result);
        $resultado['nombres'] = $fila['nombres'];
        $resultado['apellidos'] = $fila['apellidos'];
        $resultado['fechaNacimiento'] = $fila['fechaNacimiento'];
        $resultado['telefono'] = $fila['telefono'];
        $resultado['sexo'] = $fila['sexo'];
        $resultado['universidad'] = $fila['universidad'];
        return $resultado;
    }

}
