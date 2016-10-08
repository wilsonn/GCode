<?php

class detalle_curso {

    function detalle_curso() {
        $this->sql = new mysql();
    }

    function lista_detalle_curso($idcurso) {
        $result = $this->sql->Execute_procedure("CALL detalle_curso_lista('$idcurso')");
        $i = 0;
        while (!!$fila = $this->sql->fetch_array($result)) {            
            $resultado["iddetalle_curso"][$i] = $fila["iddetalle_curso"];
            $resultado["descripcion_detalle_curso"][$i] = $fila["descripcion_detalle_curso"];            
            $i++;
        }
        return $resultado;
    }

}
