<?php

class usuario {
    
    function usuario() {
        $this->sql = new mysql();
    }

    function registrar_usuario($nombres,$apellidos,$fechanacimiento,$telf,$idsexo,$iduniversidad,$email,$password){ 
        $query="call registrar_usuario('".$nombres."','".$apellidos."','".$fechanacimiento."',".$telf.",".$idsexo.",".$iduniversidad.",'".$email."','".$password."')";
        $resul=$this->sql->Execute_procedure($query);
        if($resul!="error"){
            $result="<p id='0'>Registro exitoso</p>";
        }
        else{
            $result="<p id='1'>Ocurrio un error al momento del registro. Intentelo nuevamente.</p>";
        }
        return $result;
    }
    
    function loguin_user($email,$password) {
        $result = $this->sql->Execute_procedure("CALL loginusuario('$email','$password')");
        $fila = $this->sql->fetch_array($result);
        $resultado['idpersona'] = $fila['idpersona'];
        $resultado['idusuario'] = $fila['idusuario'];
        return $resultado;
    }
    
    function ver_foto_usuario($idusuario) {
        $result = $this->sql->Execute_procedure("CALL usuario_foto('$idusuario')");
        $fila = $this->sql->fetch_array($result);
        $resultado['foto'] = $fila['foto'];
        return json_encode($resultado);
    }
        
}
