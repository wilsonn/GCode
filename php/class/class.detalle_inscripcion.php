<?php

class detalle_inscripcion {

    function detalle_inscripcion() {
        $this->sql = new mysql();
    }

    function detalle_inscripcion_usuario($idusuario) {
        $result = $this->sql->Execute_procedure("CALL detalle_inscripcion_cursos($idusuario)");
        $i = 0;
        while (!!$fila = $this->sql->fetch_array($result)) {
            $resultado["iddetalle_inscripcion"][$i] = $fila["iddetalle_inscripcion"];
            $resultado["idcurso"][$i] = $fila["idcurso"];
            $resultado["descripcion_curso"][$i] = $fila["descripcion_curso"];
            $resultado["fecha_inscripcion"][$i] = $fila["fecha_inscripcion"];
            $i++;
        }
        return json_encode($resultado);        
    }

}
