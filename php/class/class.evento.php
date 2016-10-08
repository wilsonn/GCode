<?php

class evento {
    
    function evento() {
        $this->sql = new mysql();
    }

    function lista_eventos() {
        $result = $this->sql->Execute_procedure("CALL evento_listar()");
        $i = 0;
        while (!!$fila = $this->sql->fetch_array($result)) {
            $resultado["idevento"][$i] = $fila["idevento"];
            $resultado["idtipo_evento"][$i] = $fila["idtipo_evento"];
            $resultado["descripcion_tipo_evento"][$i] = $fila["descripcion_tipo_evento"];
            $resultado["descripcion_evento"][$i] = $fila["descripcion_evento"];
            $resultado["fecha_evento"][$i] = $fila["fecha_evento"];
            $resultado["observaciones_evento"][$i] = $fila["observaciones_evento"];
            $i++;
        }
        return $resultado;
    }

}
