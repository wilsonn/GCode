<?php
	class preferencias{
		function preferencias(){
			$this->sql = new mysql();
		}

		function registrar_preferencias($idusuario,$idcurso,$idnivel,$idmodalidad,$precio,$nroparticipantes,$recomendaciones) {
	        $query="CALL registrar_preferencias('$idusuario','$idcurso','$idnivel','$idmodalidad','$precio','$nroparticipantes','$recomendaciones')";
	        $resul=$this->sql->Execute_procedure($query);
	        if($resul!="error"){
                $result="<p id='0'>Preferencia enviada correctamente.<br/>Gracias por participar.</p>";
            }
            else{
                $result="<p id='1'>Ocurrio un error al momento del envio de la preferencia. Intentelo nuevamente.</p>";
            }
            return $result;
    	}
	}
?>