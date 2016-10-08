<?php
	class nivel{

		function nivel(){
			 $this->sql = new mysql();
		}

		function lista_nivel_por_curso($idcurso) {
	        $result = $this->sql->Execute_procedure("CALL lista_nivel_por_curso('$idcurso')");
	        $i = 0;
	        while (!!$fila = $this->sql->fetch_array($result)) {
	            $resultado["idnivel"][$i] = $fila["idnivel"];
	            $resultado["descripcion_nivel"][$i] = $fila["descripcion_nivel"];
	            $i++;
	        }
	        return $resultado;
    	}
	}
?>