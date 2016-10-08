<?php

class curso {

    function curso() {
        $this->sql = new mysql();
    }

    function lista_curso_por_categoria($idcategoria) {
        $result = $this->sql->Execute_procedure("CALL curso_lista_por_categoria('$idcategoria')");
        $i = 0;
        while (!!$fila = $this->sql->fetch_array($result)) {
            $resultado["idcurso"][$i] = $fila["idcurso"];
            $resultado["descripcion_curso"][$i] = $fila["descripcion_curso"];
            $i++;
        }
        return $resultado;
    }

    function lista_curso() {
        $result = $this->sql->Execute_procedure("CALL curso_lista()");
        $i = 0;
        while (!!$fila = $this->sql->fetch_array($result)) {
            $resultado["idcurso"][$i] = $fila["idcurso"];
            $resultado["descripcion_curso"][$i] = $fila["descripcion_curso"];
            $i++;
        }
        return $resultado;
    }

}
