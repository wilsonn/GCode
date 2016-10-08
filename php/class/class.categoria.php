<?php

class categoria {

    function categoria() {
        $this->sql = new mysql();
    }

    function lista_categoria() {
        $result = $this->sql->Execute_procedure("CALL categoria_lista()");
        $i = 0;
        while (!!$fila = $this->sql->fetch_array($result)) {
            $resultado["idcategoria"][$i] = $fila["idcategoria"];
            $resultado["descripcion_categoria"][$i] = $fila["descripcion_categoria"];
            $resultado["abreviatura_categoria"][$i] = $fila["abreviatura_categoria"];
            $resultado["for_class"][$i] = $fila["for_class"];
            $i++;
        }
        return $resultado;
    }

}
