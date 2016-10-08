var REP=0;//indicara si es la primera vez que ingresa a la funcion cargar_nivel_por_curso

$(document).ready(inicio);
function inicio() {
    cargar_cursos();
    
    var enviarPreferencias=document.getElementById("enviar");
    enviarPreferencias.addEventListener("click",ValidaFormPreferencias,false);

    var ayudaCurso=document.getElementById("cursoayuda");
    ayudaCurso.addEventListener("click",MsgCursoayuda,false);
    
    var ayudaNivel=document.getElementById("nivelayuda");
    ayudaNivel.addEventListener("click",MsgNivelayuda,false);
    
    var ayudaPrecio=document.getElementById("precioayuda");
    ayudaPrecio.addEventListener("click",MsgPrecioayuda,false);
    
    var ayudaParticipantes=document.getElementById("participantesayuda");
    ayudaParticipantes.addEventListener("click",MsgParticipantesayuda,false);
}

/*Este metodo se encargara de cargar la lista de cursos
que tiene gcode*/
function cargar_cursos() {
    console.log("cargar_cursos()");
    var parametros = {};
    $.ajax({
        data: parametros,
        url: 'php/principal.php?op=listar_curso',
        type: 'POST',
        dataType: "json"
    }).done(function (data) {
        console.log("success: " + data);
        var option = "";
        for (var i = 0; i < data["idcurso"].length; i++) {
            option = "<option value='"+data["idcurso"][i]+"'>"+data["descripcion_curso"][i]+"</option>";
            $("#cursos").append(option);
        }
    }).fail(function (XHR, status, error) {
        console.log("error: " + error);
    }).always(function () {
        console.log("complete");
    });
}

/*Este metodo se encarga de cargar en una etiqueta
select todos los niveles de un determinado curso seleccionado por
el usuario*/
function cargar_nivel_por_curso() {
    console.log("cargar_nivel_por_curso()");
    var idcurso=document.getElementById("cursos").options[document.getElementById("cursos").selectedIndex].value;
    if(idcurso!=''){
        if(REP>0)//compruebo si es la primera vez que ingreso a esta funcion
          limpiarNivel();//limpio la etiqueta select
        var parametros = {
            "idcurso": idcurso
        };
        $.ajax({
            data: parametros,
            url: 'php/principal.php?op=listar_nivel_curso',
            type: 'POST',
            dataType: 'json',
            //async: false
        }).done(function (response) {
            console.log("success: " + response);
            var option = "";
            for (var i = 0; i < response["idnivel"].length; i++) {
                option = "<option value='"+response["idnivel"][i]+"'>"+response["descripcion_nivel"][i]+"</option>";
                $("#nivel").append(option);
            }
            REP++;    
        }).fail(function (XHR, status, error) {
            console.log("error: " + error);
        }).always(function () {
            console.log("complete");
        });
    }
}

/*Este metodo limpiara un select*/
function limpiarNivel(){
    var nivel;//etiqueta select recuperada
    var opcion;//etiqueta option recuperada
    var valor;//valor value de la etiqueta iption
    var tamanno;//tamaño de la etiqueta select
    nivel=document.getElementById("nivel");
    tamanno=nivel.length;
    while(tamanno>1){    
        valor=nivel.options[1].value;
        opcion=nivel.options[1];
        if(valor!='')
            opcion.parentNode.removeChild(opcion);//eliminamos la opcion
        tamanno=nivel.length;
    }
}

/*este metodo activa o desativa el text de precio
segun sea la modalidad elegida*/
function act_desact_Precio(){
    var radiomodalidad;
    var idmodalidad;
    var precio;
    radiomodalidad=document.getElementsByName("modalidad");
    precio=document.getElementById("precio");
    for(var i=0;i<radiomodalidad.length;i++){
        if(radiomodalidad[i].checked){
            idmodalidad=radiomodalidad[i].value;
            if(idmodalidad=='1'){
                precio.disabled=true;
                precio.value='';
            }
            else{
                precio.disabled=false;
            }
            break;
        }
    }
}

/*Este metodo comprobara que todos los datos ingresados
en la interfaz de preferencias sean correctos*/
function ValidaFormPreferencias(){
    //definimos las variable
    var curso;
    var nivel;
    var modalidad;
    var idmodalidad;
    var precio;
    var nroparticipantes;
    var recomendaciones;
    var idusuario = $("#idusuario").val();
    //recuperamos los datos
    curso=document.getElementById("cursos").options[document.getElementById("cursos").selectedIndex].value;
    nivel=document.getElementById("nivel").options[document.getElementById("nivel").selectedIndex].value;
    modalidad=document.getElementsByName("modalidad");
    for(var i=0;i<modalidad.length;i++){
        if(modalidad[i].checked){
            idmodalidad=modalidad[i].value;
            break;
        }
    }
    precio=document.getElementById("precio").value;
    nroparticipantes=document.getElementById("participantes").value;
    recomendaciones=document.getElementById("recomendaciones").value;

    //validacion de datos ingresados en el formulario
    ValidacionDetalle=AnalizarValidacionDetalle(curso,nivel,idmodalidad,precio,nroparticipantes);
    
    if(ValidacionDetalle){//todos los datos son correctos
        EnviatophpPreferencia(idusuario,curso,nivel,idmodalidad,precio,nroparticipantes,recomendaciones);//metodo para utilizar ajax
    }
}

/*Este metodo permitira analizar al detalle
todos los valores ingresados en la interfaz 
retornara true si todo esta correcto*/
function AnalizarValidacionDetalle(curso,nivel,idmodalidad,precio,nroparticipantes){
    var cursovalido,nivelvalido,preciovalido,nroparticipantesvalido;
    
    if(curso==''){//verificamos curso al detalle
        $("#cursomal").show();
        $("#cursobien").hide();
        $("#cursoayuda").show();
        cursovalido=0;
    }
    else{
        $("#cursomal").hide();
        $("#cursoayuda").hide();
        $("#cursobien").show();
        cursovalido=1;
    }
        
    if(nivel==''){//verificamos nivel al detalle
        $("#nivelmal").show();
        $("#nivelbien").hide();
        $("#nivelayuda").show();
        nivelvalido=0;
    }
    else{
        $("#nivelmal").hide();
        $("#nivelbien").show();
        $("#nivelayuda").hide();
        nivelvalido=1;
    }   

    if(idmodalidad=="1"){//modalidad es gratis
        if(precio==''){
            $("#preciomal").hide();
            $("#preciobien").show();
            $("#precioayuda").hide();
            preciovalido=1;   
        }
        else{
            $("#preciomal").show();
            $("#preciobien").hide();
            $("#precioayuda").show();
            preciovalido=0;   
        }   
    }//modalidad es pagada
    else{
        if(precio==''){
            $("#preciomal").show();
            $("#preciobien").hide();
            $("#precioayuda").show();
            preciovalido=0;   
        }
        else{
            if(validaPrecio(precio)){
                $("#preciomal").hide();
                $("#preciobien").show();
                $("#precioayuda").hide();
                preciovalido=1;           
            }
            else{
                $("#preciomal").show();
                $("#preciobien").hide();
                $("#precioayuda").show();
                preciovalido=0;
            }
        }
    }
    
    if(nroparticipantes==''){//verificamos nro participantes al detalle
        $("#participantesmal").show();
        $("#participantesbien").hide();
        $("#participantesayuda").show();
        nroparticipantesvalido=0;   
    }
    else{
        if(validaParticipantes(nroparticipantes)){
            $("#participantesmal").hide();
            $("#participantesbien").show();
            $("#participantesayuda").hide();
            nroparticipantesvalido=1;           
        }
        else{
            $("#participantesmal").show();
            $("#participantesbien").hide();
            $("#participantesayuda").show();
            nroparticipantesvalido=0;
        }
    }

    if(preciovalido==1&&cursovalido==1&&nivelvalido==1&&nroparticipantesvalido==1)
        return true;
    else
        return false;               
}

/*Este metodo verifica que el valor ingresa en precio
sea un numero tanto entero como decimal*/
function validaPrecio(precio){
    var expreg=/[0-9].{0,1}[0-9]{0,}/;
    if(expreg.test(precio)){
        return true;
    }    
    else
        return false;
}

/*Este metodo verificara que el valor ingresado en
numero de participantes sea un numero entero*/
function validaParticipantes(participantes){
    var expreg=/[0-9]/;
    if(expreg.test(participantes)){
        return true;
    }    
    else
        return false;
}

/*El metodo EnviatophpPreferencias enviara a un
archivo php los datos del formulario para registrar
la preferencia de los usuarios*/
function EnviatophpPreferencia(idusuario,curso,nivel,idmodalidad,precio,nroparticipantes,recomendaciones) {
    console.log("EnviatophpPreferencia()");
        var parametros = {
            'idusuario':idusuario,
            'idcurso':curso,
            'idnivel':nivel,
            'idmodalidad':idmodalidad,
            'precio':precio,
            'nroparticipantes':nroparticipantes,
            'recomendaciones':recomendaciones
        };
        $.ajax({
            data: parametros,
            url: 'php/principal.php?op=registrar_preferencia',//uri del archivo php
            type: 'POST',
            beforeSend: function () {//antes de enviar mediante ajax
                $("#loading").show();//muestro el icono del loading
            }
        }).done(function (data) {
            console.log("sucess: "+data);
            $("#loading").hide();//oculto el icono loading
            var id = $(data).attr("ID"); //obtener el id del resultado, https://espanol.answers.yahoo.com/question/index?qid=20130426075932AAHNrU5
            //if(id!=0)//cuando ocurra un error
              //  data="Ocurrio un error al momento del envio de la preferencia. Intentelo nuevamente.";
            $("#resultado").html(data);//incluimos la respuesta en el div resultado
            mostrarModal("#resultado");
            if(id==0)
                limpiarFormPreferencias();//limpiamos todo el formulario   
        }).fail(function (XHR, status, error) {
            console.log("error: " + error);
            $("#loading").hide();//oculto el icono loading
            $("#resultado").html("Ocurrio un error al momento del envio de la preferencia. Intentelo nuevamente.");//incluimos la respuesta en el div resultado
            mostrarModal("#resultado");
        }).always(function () {
            console.log("complete");
        });
    }

/*El metodo limpiarFormPreferencias se encarga de
volver a vaciar(poner en blanco) todos los datos del formulario*/
function limpiarFormPreferencias(){
    precio=document.getElementById("precio");
    nroparticipantes=document.getElementById("participantes");
    recomendaciones=document.getElementById("recomendaciones");
    document.getElementById("cursos").options[0].selected=true;
    document.getElementById("nivel").options[0].selected=true;
    document.getElementsByName("modalidad")[0].checked=true;
    precio.value='';
    participantes.value='';
    recomendaciones.value='';
    //$("#cursobien").hide();
    //$("#nivelbien").hide();
    //$("#preciobien").hide();
    //$("#participantesbien").hide();
     $(".icono").hide();
}



function mostrarModal(id){
    $( id ).dialog({
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
}

function MsgCursoayuda(){
    var p="<p>";
    var plast="</p>";
    var mensaje="<ol><li>Debes seleccionar un curso.</li></ol>";
    $("#ayuda").html(p+mensaje+plast);
    mostrarModal("#ayuda");
}

function MsgNivelayuda(){
    var p="<p>";
    var plast="</p>";
    var mensaje="<ol><li>Debes seleccionar un nivel</li></ol>";
    $("#ayuda").html(p+mensaje+plast);
    mostrarModal("#ayuda");
}

function MsgPrecioayuda(){
    var p="<p>";
    var plast="</p>";
    var mensaje="<ol><li>Es un campo obligatorio si seleccionas modalidad pagada.</li><li>Solo se aceptan n&uacute;meros enteros y decimales</li></ol>";
    $("#ayuda").html(p+mensaje+plast);
    mostrarModal("#ayuda");
}

function MsgParticipantesayuda(){
    var p="<p>";
    var plast="</p>";
    var mensaje="<ol><li>Es un campo obligatorio.</li><li>Se permiten solo n&uacute;meros enteros.</li></ol>";
    $("#ayuda").html(p+mensaje+plast);
    mostrarModal("#ayuda");
}
