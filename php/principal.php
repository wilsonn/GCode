<?php

include_once 'class/class.mysql.php';
include_once 'class/class.persona.php';
include_once 'class/class.usuario.php';
include_once 'class/class.categoria.php';
include_once 'class/class.curso.php';
include_once 'class/class.detalle_curso.php';
include_once 'class/class.detalle_inscripcion.php';
include_once 'class/class.evento.php';
include_once 'class/class.nivel.php';
include_once 'class/class.preferencias.php';
include_once 'class/class.colaborador.php';

$idcategoria = $_REQUEST["idcategoria"];
$idcurso = $_REQUEST["idcurso"];
$idpersona = $_REQUEST["idpersona"];
$idusuario = trim($_REQUEST["idusuario"]);

/*Obteniendo datos para el registro ---whnm probando para registrar usuario*/
$nombres=$_REQUEST['txtnombre'];
$apellidos=$_REQUEST['txtapellidos'];
$fechanacimiento=$_REQUEST['txtfechanac'];
$telf=$_REQUEST['txttelefono'];
$idsexo=$_REQUEST['sexo'];
$iduniversidad=$_REQUEST['universidad'];

//estos dos ultimos tambien serviran al momento de obtener informacion para el login
$email=$_REQUEST['email'];
$password=md5($_REQUEST['password']);
//fin de datos para el registro

//registro de una preferencia
$idnivel=$_REQUEST["idnivel"];
$idmodalidad=$_REQUEST["idmodalidad"];
$precio=$_REQUEST["precio"];
$NroParticipantes=$_REQUEST["nroparticipantes"];
$recomendaciones=$_REQUEST["recomendaciones"];

//registro de un colaborador
$conocimiento=json_decode($_REQUEST['conocimiento']);
$experiencia=json_decode($_REQUEST['experiencia']);
$tiempo=json_decode($_REQUEST['tiempo']);

/*codigo whnm*/

$op = trim($_REQUEST['op']);

switch ($op) {
    default:main();
        break;
    case "registrar_usuarios":registrar_usuarios();
        break;
    case "login_usuario":login_usuario();
        break;
    case "listar_curso":curso_lista();
        break;
    case "registrar_preferencia":registrar_preferencias();
        break;
    case "registrar_colaboradores":registrar_colaborador();
        break;    
    case "listar_categoria":categoria_lista();
        break;
    case "listar_curso":curso_lista();
        break;
    case "listar_nivel_curso":curso_lista_nivel();
        break;
    case "cursos_usuario":usuarios_cursos();
        break;
    case "listar_detalle_curso":detalle_curso_lista();
        break;
    case "listar_eventos":eventos_lista();
        break;
    case "informacion_usuario":informacion_usuario();
        break;    
    case "foto_usuario":foto_usuario();
        break;    
}

function main() {
    echo "Opcion no disponible";
}

function registrar_usuarios(){
    global $nombres,$apellidos,$fechanacimiento,$telf,$idsexo,$iduniversidad,$email,$password;
    $usuario=new usuario();
    $resul=$usuario->registrar_usuario($nombres,$apellidos,$fechanacimiento,$telf,$idsexo,$iduniversidad,$email,$password);    
    echo $resul;
}

function login_usuario() {
    global $email, $password;
    $usuario = new usuario();
    $ver_user = $usuario->loguin_user($email, $password);
    if (count($ver_user["idpersona"]) > 0) {
        $idpersona = $ver_user["idpersona"];
        $idusuario = $ver_user["idusuario"];
        session_start();
        $persona = new persona();
        $ver_persona = $persona->ver_datos_persona($ver_user["idpersona"]);
        $se_logeo = $ver_persona["nombres"] . " " . $ver_persona["apellidos"];
        $_SESSION['usuario'] = $se_logeo;
        $_SESSION['idpersona'] = $idpersona;
        $_SESSION['idusuario'] = $idusuario;
        header("Location: ../panelUsuario.php");
    } else {
        echo 'Cuenta no existe. Registrese por favor';
    }
}


function categoria_lista() {
    $categoria = new categoria();
    $lista = $categoria->lista_categoria();
    echo json_encode($lista);
}

function curso_lista() {
    global $idcategoria;
    $curso = new curso();
    $lista = $curso->lista_curso($idcategoria);
    echo json_encode($lista);
}

function curso_lista_nivel() {
    global $idcurso;
    $nivel = new nivel();
    $lista = $nivel->lista_nivel_por_curso($idcurso);
    echo json_encode($lista);
}

function registrar_preferencias(){
    global $idusuario,$idcurso,$idnivel,$idmodalidad,$precio,$NroParticipantes,$recomendaciones;
    $preferencias=new preferencias();
    $resul=$preferencias->registrar_preferencias($idusuario,$idcurso,$idnivel,$idmodalidad,$precio,$NroParticipantes,$recomendaciones);
    echo $resul;
}

function registrar_colaborador(){
    global $conocimiento,$experiencia,$tiempo,$idusuario;
    $colaborador=new colaborador();
    $result=$colaborador->registrar_colaborador($idusuario,$conocimiento,$experiencia,$tiempo);
    echo $result;
}

function detalle_curso_lista() {
    global $idcurso;
    $detalle_curso = new detalle_curso();
    $lista = $detalle_curso->lista_detalle_curso($idcurso);
    echo json_encode($lista);
}

function eventos_lista() {
    $evento = new evento();
    $lista = $evento->lista_eventos();
    echo json_encode($lista);
}

function informacion_usuario() {
    global $idpersona;
    $persona = new persona();
    $lista = $persona->ver_datos_persona($idpersona);
    echo json_encode($lista);
}

function usuarios_cursos() {
    global $idusuario;
    $detalle_inscripcion = new detalle_inscripcion();
    $lista = $detalle_inscripcion->detalle_inscripcion_usuario($idusuario);
    echo $lista;
}

function foto_usuario(){
    global $idusuario;
    $usuario = new usuario();
    $foto = $usuario->ver_foto_usuario($idusuario);
    echo $foto;
}