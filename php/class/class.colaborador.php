<?php
	class colaborador{

		function colaborador(){
			$this->sql = new mysql();
		}

		function registrar_colaborador($idusuario,$conocimiento,$experiencia,$tiempo) {
	        /*Empezamos una transaccion*/
	        //$this->sql->Conexion->autocommit(FALSE);
	        $this->sql->iniciar_transaccion();
			//$all_query_ok=true;
			$tamanno=count($conocimiento);
			//$query="CALL registrar_conocimientos('$idusuario','".$conocimiento[0]."','".$experiencia[0]."','".$tiempo[0]."');";
			for($i=0;$i<$tamanno;$i++){
				$query="CALL registrar_conocimientos('$idusuario','".$conocimiento[$i]."','".$experiencia[$i]."','".$tiempo[$i]."');";
				$result1=$this->sql->Execute_procedure($query);
			}

			$query="CALL actualizar_estado_usuario('$idusuario')";
			$result2=$this->sql->Execute_procedure($query);
			//now let's test our control variable 
			//$all_query_ok ? $mysqli->commit(): $mysqli-> 
    
	        if($result1!="error"&& $result2!="error"){
	        	//$this->sql->Conexion->commit();
	        	$this->sql->aceptar_transaccion();
                $result="<p id='0'>Solicitud enviada correctamente.<br/>Gracias.</p>";
            }
            else{
            	//$this->sql->Conexion->rollback();
            	$this->sql->cancelar_transaccion();
                $result="<p id='1'>Ocurrio un error al momento de enviar la solicitud. Intentelo nuevamente.</p>";
            }
            return $result;
    	}
	}
?>