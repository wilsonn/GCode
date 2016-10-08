var IDS=1;
var NUMINPUTTEXT=0;

$(document).ready(inicio);
function inicio() {
    var btnmasConocimientos=document.getElementById("mas");
    btnmasConocimientos.addEventListener("click",Aumentar_input_text,false);

    var btnmenosConocimientos=document.getElementById("menos");
    btnmenosConocimientos.addEventListener("click",Quitar_input_text,false);

    var enviarSolicitudColaborador=document.getElementById("enviar");
    enviarSolicitudColaborador.addEventListener("click",ValidaFormColaboradores,false);

    var ayudaConocimientos=document.getElementById("conocimientoayuda");
    ayudaConocimientos.addEventListener("click",MsgconocimientoAyuda,false);

    var ayudaBeneficios=document.getElementById("beneficiosayuda");
    ayudaBeneficios.addEventListener("click",MsgbeneficiosAyuda,false);
    
    var ayudaCondiciones=document.getElementById("condicionesayuda");
    ayudaCondiciones.addEventListener("click",MsgcondicionesAyuda,false);


    //var cancelarSolicitudColaborador=document.getElementById("cancelar");
    //cancelarSolicitudColaborador.addEventListener("click",CancelarFormColaboradores,false);
}

function Aumentar_input_text(){
    console.log("Aumentar_input_text()");
    var input;
    var menos=document.getElementById("menos");
    input = "<div id='"+IDS+"' name='conocimiento' class='titulo-datos alinear-elementos'>"+
            "<label>Conocimiento: </label>"+
            "<input type='text' name='conocimiento"+IDS+"' id='conocimiento"+IDS+"'/><br/>"+
            "<label>Experiencia:</label>"+
            "<input type='number' name='experiencia"+IDS+"' id='experiencia"+IDS+"' min='0' step='1'/>"+
            "<select id='tiempo"+IDS+"'>"+
            "<option value=''>-Selecciona-</option>"+
            "<option value='a&ntilde;os'>años</option>"+
            "<option value='meses'>meses</option>"+
            "</select><br/>"+
            "<input type='checkbox' name='borrar' id='borrar"+IDS+"' value='"+IDS+"'/>Eliminar"+
            "&nbsp;&nbsp;&nbsp;&nbsp;<abbr title='Correcto'>"+
            "<img src='img/bien.ico' class='icono' id='conocimiento"+IDS+"bien' alt='bien'/>"+
            "</abbr><abbr title='Incorrecto'>"+
            "<img src='img/mal.ico' class='icono' id='conocimiento"+IDS+"mal' alt='mal'/>"+
            "</abbr>"+
            "</div>";
    $("#conocimientos").append(input);
    IDS++;
    NUMINPUTTEXT++;
    if(menos.disabled==true){
        console.log("Menos esta deshabilitado");
        menos.disabled=false;
    }
    console.log("IDS:"+IDS+"   NUMINPUTTEXT:"+NUMINPUTTEXT);
    console.log("completado");
}

function Quitar_input_text(){
    console.log("Quitar_input_text()");
    var menos=document.getElementById("menos");
    var divBorrar;
    var checkBorrar=document.getElementsByName("borrar");
    var CantCheckbox=checkBorrar.length;
    var i=0;
    console.log("Cantidad checkbox:"+CantCheckbox);
    if(CantCheckbox>0){
        while(CantCheckbox>i)
        {
            console.log("Cantidad checkbox:"+CantCheckbox+" i:"+i);
            if(checkBorrar[i].checked){
                console.log("checkbox "+i+"esta seleccionado"+checkBorrar[i].value);
                divBorrar=document.getElementById(checkBorrar[i].value);
                divBorrar.parentNode.removeChild(divBorrar);
                NUMINPUTTEXT--;
            }
            else{
                console.log("checkbox "+i+" no esta seleccionado "+checkBorrar[i].value);
                i++;
            }
            CantCheckbox=checkBorrar.length;
        }
    }
    else{
        menos.disabled=true;
        console.log("deshabilitando menos");
    }
    console.log("completado"); 
}

/*Este metodo comprobara que todos los datos ingresados
en la interfaz de colaboradores sean correctos*/
function ValidaFormColaboradores(){
    console.log("ValidaFormColaboradores()");
    //definimos las variable
    var conocimientos;
    var idconocimientos;
    var inputConocimiento;
    var inputExperiencia;
    var inputTiempo;
    var arrayconocimientos=new Array(4);
    arrayconocimientos['ids']=new Array();
    arrayconocimientos['conocimiento']=new Array();
    arrayconocimientos['experiencia']=new Array();
    arrayconocimientos['tiempo']=new Array();
    //var idusuario="1";
    var idusuario = $("#idusuario").val();
    var leiBeneficios;
    var leiCondiciones;
    
    //recuperamos los datos
    conocimientos=document.getElementsByName("conocimiento");//divs de conocimientos
    leiBeneficios=document.getElementById("leiBeneficios");//checkbox lei beneficios
    leiCondiciones=document.getElementById("leiCondiciones");//checkbos lei condiciones
    console.log("Divs conocimientos: "+conocimientos.length)
    for(var i=0;i<conocimientos.length;i++){//almacenamos los datos de cada conocimiento en un array;
        idconocimientos=conocimientos[i].id;
        console.log("id: "+idconocimientos);
        inputConocimiento=document.getElementById("conocimiento"+idconocimientos);
        inputExperiencia=document.getElementById("experiencia"+idconocimientos);
        inputTiempo=document.getElementById("tiempo"+idconocimientos);
        arrayconocimientos['ids'][i]=idconocimientos;
        arrayconocimientos['conocimiento'][i]=inputConocimiento.value;
        arrayconocimientos['experiencia'][i]=inputExperiencia.value;
        arrayconocimientos['tiempo'][i]=inputTiempo[inputTiempo.selectedIndex].value;
        console.log(arrayconocimientos['ids'][i]+" - "+arrayconocimientos['conocimiento'][i]+" - "+arrayconocimientos['experiencia'][i]+" - "+arrayconocimientos['tiempo'][i]);
    }
    
    //validacion de datos ingresados en el formulario
    ValidacionDetalle=AnalizarValidacionDetalle(arrayconocimientos,leiBeneficios,leiCondiciones);

    if(ValidacionDetalle){//todos los datos son correctos
        EnviatophpColaboradores(arrayconocimientos,idusuario);//metodo para utilizar ajax
    }
}

/*Este metodo permitira analizar al detalle
todos los valores ingresados en la interfaz 
retornara true si todo esta correcto*/
function AnalizarValidacionDetalle(arrayconocimientos,leiBeneficios,leiCondiciones){
    console.log("AnalizarValidacionDetalle()");
    var arrayconocimientosparcial;
    var arrayconocimientosvalido;
    var leiBeneficiosvalido;
    var leiCondicionesvalido;
    var id;
    var tamannoarrayconocimientos;
    arrayconocimientosparcial=1;
    arrayconocimientosvalido=1;
    console.log("Tamaño de array conocimientos: "+arrayconocimientos['conocimiento'].length);
    tamannoarrayconocimientos=arrayconocimientos['conocimiento'].length;
    if(tamannoarrayconocimientos==0){
        arrayconocimientosvalido=0;
        $("#conocimientoayuda").show();
    }
    else{
        for(var i=0;i<arrayconocimientos['conocimiento'].length;i++){
            id=arrayconocimientos['ids'][i];
            if(arrayconocimientosparcial==0){
                arrayconocimientosvalido=0;
            }
            console.log("arrayconocimientosvalido: "+arrayconocimientosvalido);
            if(arrayconocimientos['conocimiento'][i]=='')//validando conocimiento de posicion i al detalle
            {
                $("#conocimiento"+id+"mal").show();
                $("#conocimiento"+id+"bien").hide();
                if(arrayconocimientosparcial==1)
                {    
                    $("#conocimientoayuda").show();
                    arrayconocimientosvalido=0;
                }
                arrayconocimientosparcial=0;
                continue;
            }
            else{
                if(arrayconocimientos['experiencia'][i]==''){
                    $("#conocimiento"+id+"mal").show();
                    $("#conocimiento"+id+"bien").hide();
                    if(arrayconocimientosparcial==1){
                        $("#conocimientoayuda").show();
                        arrayconocimientosvalido=0;
                    }
                    arrayconocimientosparcial=0;
                    continue;
                }
                else{
                    if(!validaExperiencia(arrayconocimientos['experiencia'][i])){
                        $("#conocimiento"+id+"mal").show();
                        $("#conocimiento"+id+"bien").hide();
                        if(arrayconocimientosparcial==1){
                            $("#conocimientoayuda").show();
                            arrayconocimientosvalido=0;
                        }
                        arrayconocimientosparcial=0;
                        continue;
                    }
                    else{
                        if(arrayconocimientos['tiempo'][i]==''){
                            $("#conocimiento"+id+"mal").show();
                            $("#conocimiento"+id+"bien").hide();
                            if(arrayconocimientosparcial==1){
                                 $("#conocimientoayuda").show();
                                arrayconocimientosvalido=0;
                            }
                            arrayconocimientosparcial=0;
                            continue;       
                        }
                        else{
                            $("#conocimiento"+id+"mal").hide();
                            $("#conocimientoayuda").hide();
                            $("#conocimiento"+id+"bien").show();
                            arrayconocimientosparcial=1;       
                        }
                    }
                    
                }
            }
        }
    }
    if(!leiBeneficios.checked){//verificamos lei beneficios al detalle
        $("#beneficiosmal").show();
        $("#beneficiosbien").hide();
        $("#beneficiosayuda").show();
        leiBeneficiosvalido=0;
    }
    else{
        $("#beneficiosmal").hide();
        $("#beneficiosayuda").hide();
        $("#beneficiosbien").show();
        leiBeneficiosvalido=1;
    }
        
    if(!leiCondiciones.checked){//verificamos lei condiciones al detalle
        $("#condicionesmal").show();
        $("#condicionesbien").hide();
        $("#condicionesayuda").show();
        leiCondicionesvalido=0;
    }
    else{
        $("#condicionesmal").hide();
        $("#condicionesbien").show();
        $("#condicionesayuda").hide();
        leiCondicionesvalido=1;
    }   
    console.log("arrayconocimientosvalido: "+arrayconocimientosvalido+" leiBeneficiosvalido: "+leiBeneficiosvalido+" leiCondicionesvalido: "+leiCondicionesvalido)
    if(arrayconocimientosvalido==1&&leiBeneficiosvalido==1&&leiCondicionesvalido==1)
        return true;
    else
        return false;               
}

function validaExperiencia(experiencia){
    var expreg=/[0-9]/;
    if(expreg.test(experiencia)){
        return true;
    }    
    else
        return false;
}

/*El metodo EnviatophpPreferencias enviara a un
archivo php los datos del formulario para registrar
la preferencia de los usuarios*/
function EnviatophpColaboradores(arrayconocimientos,idusuario) {
    console.log("EnviatophpColaboradores()");
        var conocimientos=JSON.stringify(arrayconocimientos['conocimiento']);
        var experiencias=JSON.stringify(arrayconocimientos['experiencia']);
        var tiempos=JSON.stringify(arrayconocimientos['tiempo']);
        //var jsonconocimientos  = JSON.stringify(arrayconocimientos);
        //var jsonconocimientos=$.parseJSON(arrayconocimientos);
        //idusuario=2;//despues lo obtengo
        $.ajax({
            data: {
                'idusuario':idusuario,
                'conocimiento':conocimientos,
                'experiencia':experiencias,
                'tiempo':tiempos
             },
            url: 'php/principal.php?op=registrar_colaboradores',//uri del archivo php
            type: 'POST',
            beforeSend: function () {//antes de enviar mediante ajax
                $("#loading").show();//muestro el icono del loading
            }
        }).done(function (data) {
            console.log("sucess: "+data);
            $("#loading").hide();//oculto el icono loading
            var id = $(data).attr("ID"); //obtener el id del resultado, https://espanol.answers.yahoo.com/question/index?qid=20130426075932AAHNrU5
            //if(id!=0)//cuando ocurra un error
            //    data="Ocurrio un error al momento de enviar la solicitud. Intentelo nuevamente.";
            $("#resultado").html(data);//incluimos la respuesta en el div resultado
            mostrarModal("#resultado");
            if(id==0)
                limpiarFormColaboradores();//limpiamos todo el formulario 
        }).fail(function (XHR, status, error) {
            console.log("error: " + error);
            $("#loading").hide();//oculto el icono loading
            $("#resultado").html("Ocurrio un error al momento de enviar la solicitud. Intentelo nuevamente.");//incluimos la respuesta en el div resultado
            mostrarModal("#resultado");
        }).always(function () {
            console.log("complete");
        });
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

function limpiarFormColaboradores(){
    console.log("limpiarFormColaboradores()");
    var checkBorrar=document.getElementsByName("borrar");
    var CantCheckbox=checkBorrar.length;
    var i=0;
    console.log("Cantidad checkbox:"+CantCheckbox);
    while(CantCheckbox>i)
    {
        console.log("Borrando conocimientos ....");          
        divBorrar=document.getElementById(checkBorrar[i].value);
        divBorrar.parentNode.removeChild(divBorrar);
        CantCheckbox--;
    }

    console.log("Limpiando checkbox lei ....");
    document.getElementById("leiBeneficios").checked=false;

    console.log("Limpiando checkbox condiciones ....");
    document.getElementById("leiCondiciones").checked=false;

    $(".icono").hide();

}

function MsgconocimientoAyuda(){
    var p="<p>";
    var plast="</p>";
    var mensaje="<ol><li>Debe ingresar al menos un conocimiento</li>"+
                    "<li>Todos los campos son obligatorios</li>"+
                    "<li>El campo Conocimiento acepta solo letras</li>"+
                    "<li>El campo Experiencia acepta solo numeros</li></ol>";
    $("#ayuda").html(p+mensaje+plast);
    mostrarModal("#ayuda");                
}

function MsgbeneficiosAyuda(){
    var p="<p>";
    var plast="</p>";
    var mensaje="<ol><li>Debe seleccionar He leido los beneficios</li></ol>";
    $("#ayuda").html(p+mensaje+plast);
    mostrarModal("#ayuda");                
}

function MsgcondicionesAyuda(){
    var p="<p>";
    var plast="</p>";
    var mensaje="<ol><li>Debe seleccionar He leido las condiciones y restricciones</li></ol>";
    $("#ayuda").html(p+mensaje+plast);
    mostrarModal("#ayuda");                
}



