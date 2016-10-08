$(document).ready(inicio);
function inicio() {
    cargar_categorias();
    var idpersona = $("#idpersona").val();
    var idusuario = $("#idusuario").val();
    if (idpersona) {
        cargar_eventos_plataforma();
        cargar_foto_usuario(idusuario)
        cargar_informacion_usuario(idpersona);
        cargar_cursos_usuario(idusuario);
    }
    $("#preferencias").click(function(evento){
        //evento.preventDefault();
        $("#eventos-plataforma").load("preferencias.html");
    });

    $("#colaborador").click(function(evento){
        //evento.preventDefault();
        $("#eventos-plataforma").load("colaboradores.html");
    });
}

function cargar_foto_usuario(idusuario) {
    var parametros = {
        "idusuario": idusuario
    };
    $.ajax({
        data: parametros,
        url: 'php/principal.php?op=foto_usuario',
        type: 'POST',
        dataType: "json"
    }).done(function (data) {
        var foto = data["foto"];
        var imagen = "";
        if (!foto) {
            imagen += "<img src='img/usuario/foto-default.jpg' width='155px' height='145px' />";
        }
        $("#foto-usuario").append(imagen);
    }).fail(function (XHR, status, error) {
        //console.log("error: " + error);
    }).always(function () {
        //console.log("complete");
    });
}

function cargar_informacion_usuario(idpersona) {
    var parametros = {
        "idpersona": idpersona
    };
    $.ajax({
        data: parametros,
        url: 'php/principal.php?op=informacion_usuario',
        type: 'POST',
        dataType: "json"
    }).done(function (data) {
        var informacion = "<hr><br><ul style='text-align: left;'>";
        informacion += "<li>Fecha Nacimiento: " + data["fechaNacimiento"] + "</li><br>";
        informacion += "<li>Telefono: " + data["telefono"] + "</li><br>";
        informacion += "<li>Universidad: " + data["universidad"] + "</li><br>";
        informacion += "</ul>";
        $("#info-usuario").append(informacion);
    }).fail(function (XHR, status, error) {
        //console.log("error: " + error);
    }).always(function () {
        //console.log("complete");
    });
}

function cargar_cursos_usuario(idusuario) {
    var parametros = {
        "idusuario": $.trim(idusuario)
    };
    $.ajax({
        data: parametros,
        url: 'php/principal.php?op=cursos_usuario',
        type: 'POST',
        dataType: "json"
    }).done(function (data) {
        console.log(data);
        var cursos = "<hr><br><ul style='text-align: left;'>";
        if (data!=null) {
            for (var i = 0; i < data["iddetalle_inscripcion"].length; i++) {
                cursos += "<li>" + data["descripcion_curso"][i] + ": </li>";
                cursos += "<li>Fecha Inscripcion: " + data["fecha_inscripcion"][i] + "</li><br>";
            }
            cursos += "</ul>";
            $("#cursos-usuario").append(cursos);
        }
    }).fail(function (XHR, status, error) {
        console.log("error: " + error);
    }).always(function () {
        console.log("complete");
    });
}

function cargar_eventos_plataforma() {
    var parametros = {};
    $.ajax({
        data: parametros,
        url: 'php/principal.php?op=listar_eventos',
        type: 'POST',
        dataType: "json"
    }).done(function (data) {
        var lista = "<hr><br><ul style='text-align: left;'>";
        for (var i = 0; i < data["idevento"].length; i++) {
            lista += "<ul>" + data["descripcion_tipo_evento"][i] + ": </ul>";
            lista += "<li>" + data["descripcion_evento"][i] + "</li>";
            lista += "<li>Fecha a realizarse: " + data["fecha_evento"][i] + "</li><br>";
        }
        lista += "</ul>";
        $("#eventos-plataforma").append(lista);
    }).fail(function (XHR, status, error) {
        console.log("error: " + error);
    }).always(function () {
        console.log("complete");
    });
}

function cargar_categorias() {
    var parametros = {};
    $.ajax({
        data: parametros,
        url: 'php/principal.php?op=listar_categoria',
        type: 'POST',
        dataType: "json"
    }).done(function (data) {
        var label = "";
        for (var i = 0; i < data["idcategoria"].length; i++) {
            label = "<label class='CourseList-tab' for='" + data["for_class"][i] + "'>" +
                    data["descripcion_categoria"][i] + "</label>";
            $("#lista_categoria").append(label);
        }
    }).fail(function (XHR, status, error) {
        //console.log("error: " + error);
    }).always(function () {
        //console.log("complete");
    });
}

function mostrarInformacion(valor) {
    var info = '';
    var p = '<p>';
    var plast = "</p>";
    var array = new Array();
    var lista;
    if (valor === 'mysql') {
        lista = cargar_detalle_curso($("#idmysql").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'dweb') {
        lista = cargar_detalle_curso($("#iddweb").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'oracle') {
        lista = cargar_detalle_curso($("#idoracle").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'sqlsrv') {
        lista = cargar_detalle_curso($("#idsqlsrv").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'pback') {
        lista = cargar_detalle_curso($("#idpback").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'reposi') {
        lista = cargar_detalle_curso($("#idreposi").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'fronte') {
        lista = cargar_detalle_curso($("#idfronte").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'admsrv') {
        lista = cargar_detalle_curso($("#idadmsrv").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'jscrip') {
        lista = cargar_detalle_curso($("#idjscrip").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'phpfra') {
        lista = cargar_detalle_curso($("#idphpfra").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'android') {
        lista = cargar_detalle_curso($("#idandroid").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'pentaho') {
        lista = cargar_detalle_curso($("#idpentaho").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    } else if (valor === 'sqlsvri') {
        lista = cargar_detalle_curso($("#idsqlsvri").val());
        for (var i = 0; i < lista["iddetalle_curso"].length; i++) {
            array[i] = lista["descripcion_detalle_curso"][i];
        }
    }
//------RECORRIDO Y ASIGNACION DE VALORES DEL ARRAY
    for (var i = 0; i < array.length; i++) {
        info = info + '<span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 0px 0;"></span><p>' + array[i] + '</p>';
    }
    $("#dialog-message").html(p + info + plast);
    mostrarModal();
}

function cargar_detalle_curso(idcurso) {
    var arreglo = Array();
    var parametros = {
        "idcurso": idcurso
    };
    $.ajax({
        data: parametros,
        url: 'php/principal.php?op=listar_detalle_curso',
        type: 'POST',
        dataType: 'json',
        async: false
    }).done(function (response) {
        arreglo = response;
    }).fail(function (XHR, status, error) {
        //console.log("error: " + error);
    }).always(function () {
        //console.log("complete");
    });
    return arreglo;
}

function mostrarModal() {
    $("#dialog-message").dialog({
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
}