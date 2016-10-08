//Metodos-----WHNM
window.addEventListener("load",iniciar,false);

/*El metodo iniciar se encarga de asociar al boton 
registrarse un evento que al hacer click procese el 
metodo ValidaFormRegistro ademas de añadir el mismo evento
a cada boton de ayuda*/
function iniciar(){
	var Registrate=document.getElementById("registro");
	Registrate.addEventListener("click",ValidaFormRegistro,false);

	var ayudaNombre=document.getElementById("nombreayuda");
	ayudaNombre.addEventListener("click",Msgnombreayuda,false);
	
	var ayudaApellidos=document.getElementById("apellidosayuda");
	ayudaApellidos.addEventListener("click",Msgapellidosayuda,false);
	
	var ayudaFechanac=document.getElementById("fechanacayuda");
	ayudaFechanac.addEventListener("click",Msgfechanacayuda,false);
	
	var ayudaTelf=document.getElementById("telfayuda");
	ayudaTelf.addEventListener("click",Msgtelfayuda,false);
	
	var ayudaEmail=document.getElementById("emailayuda");
	ayudaEmail.addEventListener("click",Msgemailayuda,false);
	
	var ayudaPass=document.getElementById("passayuda");
	ayudaPass.addEventListener("click",Msgpassayuda,false);
	
	var ayudaConfPass=document.getElementById("confirpassayuda");
	ayudaConfPass.addEventListener("click",Msgconfirpassayuda,false);
}

/*El metodo ValidaFormRegistro validara los datos
del formulario para registro de usuarios y 
en el caso sean todos los datos correctos, enviara
mediante ajax (de Jquery) estos datos a un archivo
php para su posterior procesamiento*/
function ValidaFormRegistro(){
	//definimos las variables a utilizar
	var nombre;
	var apellidos;
	var telf;
	var fechanacimiento;
	var idsex;
	var iduniversidad;
	var email;
	var pass;
	var confpass;
	var radiosexo;
	var ValidacionDetalle;

	//recuperacion de los objetos del formulario
	nombre=document.getElementById("nombre");
	apellidos=document.getElementById("apellidos");
	telf=document.getElementById("telefono");
	fechanacimiento=document.getElementById("fechanacimiento");
	radiosexo=document.getElementsByName("sexo");
	for(var i=0;i<radiosexo.length;i++){
		if(radiosexo[i].checked){
			idsex=radiosexo[i].value;
			break;
		}
	}
	iduniversidad=document.getElementById("universidad").options[document.getElementById("universidad").selectedIndex].value;
	email=document.getElementById("email");
	pass=document.getElementById("registro_password");
	confpass=document.getElementById("confirpassword");
	
	//validacion de los datos ingresados en el formulario
	ValidacionDetalle=AnalizarValidacionDetalle(nombre,apellidos,telf,fechanacimiento,email,pass,confpass);
	
	if(ValidacionDetalle){//todos los datos son correctos
		EnviatophpRegistrarse(nombre.value,apellidos.value,telf.value,fechanacimiento.value,idsex,iduniversidad,email.value,pass.value);//metodo para utilizar ajax
	}
}

/* El metodo AnalizarValidacionDetalle devolvera
true: si todos los datos ingresados en el formulario estan correctos
false: en el caso que como minimo un dato sea incorrecto*/
function AnalizarValidacionDetalle(nombre,apellidos,telf,fechanacimiento,email,pass,confpass){
	var nombrevalido,apellidosvalido,telfvalido,fechanacvalida,emailvalido,passvalido,confirpassvalido;
	
	if(nombre.value==''){//verificamos nombre al detalle
		$("#nombremal").show();
		$("#nombrebien").hide();
		$("#nombreayuda").show();
		nombrevalido=0;
	}
	else{
		if(validaNombreApellidos(nombre)){
			$("#nombremal").hide();
			$("#nombreayuda").hide();
			$("#nombrebien").show();
			nombrevalido=1;
		}
		else{
			$("#nombremal").show();
			$("#nombrebien").hide();
			$("#nombreayuda").show();
			nombrevalido=0;
		}
	}
		
	if(apellidos.value==''){//verificamos apellidos al detalle
		$("#apellidosmal").show();
		$("#apellidosbien").hide();
		$("#apellidosayuda").show();
		apellidosvalido=0;
	}
	else{	
		if(validaNombreApellidos(apellidos)){
			$("#apellidosmal").hide();
			$("#apellidosbien").show();
			$("#apellidosayuda").hide();
			apellidosvalido=1;
		}
		else{
			$("#apellidosmal").show();
			$("#apellidosbien").hide();
			$("#apellidosayuda").show();
			apellidosvalido=0;		
		}
	}	

	if(telf.value==''){//verificamos telf al detalle
		$("#telfmal").show();
		$("#telfbien").hide();
		$("#telfayuda").show();
		telfvalido=0;	
	}
	else{
		if(validaTelefono(telf.value)){
			$("#telfmal").hide();
			$("#telfbien").show();
			$("#telfayuda").hide();
			telfvalido=1;			
		}
		else{
			$("#telfmal").show();
			$("#telfbien").hide();
			$("#telfayuda").show();
			telfvalido=0;
		}
	}

	if(fechanacimiento.value==''){//verificamos fecha nacimiento al detalle
		$("#fechanacmal").show();
		$("#fechanacbien").hide();
		$("#fechanacayuda").show();
		fechanacvalida=0;	
	}
	else{
		if(validaFechaNacimiento(fechanacimiento.value)){
			$("#fechanacmal").hide();
			$("#fechanacbien").show();
			$("#fechanacayuda").hide();
			fechanacvalida=1;			
		}
		else{
			$("#fechanacmal").show();
			$("#fechanacbien").hide();
			$("#fechanacayuda").show();
			fechanacvalida=0;
		}
	}

	if(email.value==''){//verificamos email al detalle
		$("#emailmal").show();
		$("#emailbien").hide();
		$("#emailayuda").show();
		emailvalido=0;	
	}
	else{
		if(validaEmail(email.value)){
			$("#emailmal").hide();
			$("#emailbien").show();
			$("#emailayuda").hide();
			emailvalido=1;			
		}
		else{
			$("#emailmal").show();
			$("#emailbien").hide();
			$("#emailayuda").show();
			emailvalido=0;
		}
	}

	if(pass.value==''){//verificamos pass al detalle
		$("#passmal").show();
		$("#passbien").hide();
		$("#passayuda").show();
		passvalido=0;	
	}
	else{
		if(validaPass(pass.value)){
			$("#passmal").hide();
			$("#passbien").show();
			$("#passayuda").hide();
			passvalido=1;			
		}
		else{
			$("#passmal").show();
			$("#passbien").hide();
			$("#passayuda").show();
			passvalido=0;
		}
	}


	if(confpass.value==''){//verificamos confirpass al detalle
		$("#confirpassmal").show();
		$("#confirpassbien").hide();
		$("#confirpassayuda").show();
		confirpassvalido=0;	
	}
	else{
		if(validaConfirpass(confpass.value,pass.value)){
			$("#confirpassmal").hide();
			$("#confirpassbien").show();
			$("#confirpassayuda").hide();
			confirpassvalido=1;			
		}
		else{
			$("#confirpassmal").show();
			$("#confirpassbien").hide();
			$("#confirpassayuda").show();
			confirpassvalido=0;
		}
	}

	if(nombrevalido==1&&apellidosvalido==1&&telfvalido==1&&fechanacvalida==1&&emailvalido==1&&passvalido==1&&confirpassvalido==1)
		return true;
	else
		return false;				
}

/*El metodo validaNombreApellidos verificara:
	- Solamente se aceptan letras.
	- Debe empezar con mayuscula la primera letra de cada nombre
*/
function validaNombreApellidos(nombre){
	var bandera=false;//bandera que controla el exito o fracaso
	var nombrenuevo="";//el nombre nuevo reemplazado
	var expreg=/^[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{2,50}$/;//definimos una expresion regular
	var nombres=(nombre.value.trim()).split(/[ ]+/);//quitamos espacios al inicio y final y dividimos la cadena
	for(var i=0;i<nombres.length;i++){//recorremos el array obtenido con split
    	if(expreg.test(nombres[i])){//evaluamos la expresion regular
    		bandera=true;//si es correcta la evaluacion 
    		nombrenuevo+=nombres[i]+" ";//vamos acumulando el nuevo nombre
    	}	
        else {
        	bandera=false;//no es correcta la evaluacion
        	break;//rompemos el bucle
        }	
	}
	if(bandera)//si todo a sido correcto
		nombre.value=nombrenuevo.trim();//modificamos el nombre.
	return bandera;
}

/*El metodo validaTelefono verificara:
	-solo se aceptan numeros
	-longitud de 6 digitos telefono y 9 digitos celular*/
function validaTelefono(telf){
	var expreg=/^[0-9]/;
	if(telf.length==6||telf.length==9)
	{
		if(expreg.test(telf)) return true;
		else return false;	
	}
	else 
		return false;
}

/*El metodo validaFechaNacimiento verificara
	-Que el usuario tenga como edad minima 15 años y una edad maxima de 100 años
*/
function validaFechaNacimiento(fechanacimiento){
	var fechanac=fechanacimiento.split("-");
	var dianac=fechanac[2];
	var mesnac=fechanac[1];
	var annonac=fechanac[0];
	var fecha=new Date();
	var annoactual=fecha.getFullYear();
	var annomin=annoactual-15;
	var annomax=annoactual-100;
	if(annonac>=annomax && annonac<=annomin){
		return true;
	}
	else{
		return false;
	}
}

/*El metodo validaEmail verificara:
	-que el usuario ingrese una estructura de mail correcta
*/
function validaEmail(email){
	expreg=/^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
	if(expreg.test(email))
		return true;
	else
		return false;
}

/*El metodo validaPass verificara:
	-que el usuario ingrese un password de 10 caracteres como minimo*/
function validaPass(pass){
	if(pass.length>=10) return true;
	else return false;
}

/*El metodo validaConfirpass verificara:
	-que el usuario ingrese el confirpass igual al pass
*/
function validaConfirpass(confirpass,pass){
	if(confirpass==pass) return true;
	else return false;
}

/*El metodo EnviatophpRegistrarse enviara a un
archivo php los datos del formulario para registrar
usuarios*/
function EnviatophpRegistrarse(nombre,apellidos,telf,fechanacimiento,idsex,iduniversidad,email,pass){
	console.log("EnviatophpRegistrarse()");
	var parametros={
		'txtnombre':nombre,
		'txtapellidos':apellidos,
		'txttelefono':telf,
		'txtfechanac':fechanacimiento,
		'sexo':idsex,
		'universidad':iduniversidad,
		'email':email,
		'password':pass};
	$.ajax({
		url: 'php/principal.php?op=registrar_usuarios',//uri del archivo php
		type: 'POST',//metodo de envio
		data: parametros,//envio de parametros
		beforeSend: function () {//antes de enviar mediante ajax
            $("#loading").show();//muestro el icono del loading
        }
	}).done(function (data) {
		console.log("sucess: "+data);
        $("#loading").hide();//oculto el icono loading
        var id = $(data).attr("ID"); //obtener el id del resultado, https://espanol.answers.yahoo.com/question/index?qid=20130426075932AAHNrU5
        //if(id!=0)//cuando ocurra un error
        //	data="Ocurrio un error al momento del registro. Intentelo nuevamente.";
        $("#resultado").html(data);//incluimos la respuesta en el div resultado
        mostrarModal("#resultado");//mostramos los el resultado en una ventana modal
        if(id==0)
        	limpiarFormRegistrarse();//limpiamos todo el formulario
    }).fail(function (XHR, status, error) {
        console.log("error: " + error);
        $("#loading").hide();//oculto el icono loading
        $("#resultado").html("Ocurrio un error al momento del registro. Intentelo nuevamente.");//incluimos la respuesta en el div resultado
    	mostrarModal("#resultado");
    }).always(function () {
        console.log("complete");
    });	
}

/*El metodo limpiarFormRegistrarse se encarga de
volver a vaciar(poner en blanco) todos los datos del formulario*/
function limpiarFormRegistrarse(){
	nombre=document.getElementById("nombre");
	apellidos=document.getElementById("apellidos");
	telf=document.getElementById("telefono");
	fechanacimiento=document.getElementById("fechanacimiento");
	email=document.getElementById("email");
	pass=document.getElementById("registro_password");
	confpass=document.getElementById("confirpassword");
	document.getElementById("universidad").options[0].selected=true;
	document.getElementsByName("sexo")[0].checked=true;
	nombre.value='';
	apellidos.value='';
	telf.value='';
	fechanacimiento.value='';
	email.value='';
	pass.value='';
	confirpassword.value='';
	//$("#nombrebien").hide();
	//$("#apellidosbien").hide();
	//$("#telfbien").hide();
	//$("#fechanacbien").hide();
	//$("#emailbien").hide();
	//$("#passbien").hide();
	//$("#confirpassbien").hide();
	 $(".icono").hide();
}

/*Todos los metodos siguientes pertenecen en particular
a cada uno de los botones ayuda para mostrar en una ventana modal
cuales son los requisitos de un determinado campo dentro del formulario*/
function Msgnombreayuda(){
	var p="<p>";
	var plast="</p>";
	var mensaje="<ol><li>Es un campo obligatorio.</li><li>Se aceptan solo letras.</li><li>Los nombres deben comenzar con may&uacute;scula.</li><li>Los nombres deben tener m&iacute;nimo de 3 caracteres.</li></ol>";
	$("#ayuda").html(p+mensaje+plast);
	mostrarModal("#ayuda");
}

function Msgapellidosayuda(){
	var p="<p>";
	var plast="</p>";
	var mensaje="<ol><li>Es un campo obligatorio.</li><li>Se aceptan solo letras.</li><li>Los apellidos deben comenzar con may&uacute;scula.</li><li>Los apellidos deben tener m&iacute;nimo de 3 caracteres.</li></ol>";
	$("#ayuda").html(p+mensaje+plast);
	mostrarModal("#ayuda");
}

function Msgfechanacayuda(){
	var p="<p>";
	var plast="</p>";
	var mensaje="<ol><li>Es un campo obligatorio.</li><li>Permite una edad m&iacute;nima de 15 a&ntilde;os y m&aacute;xima de 100 a&ntilde;os.</li></ol>";
	$("#ayuda").html(p+mensaje+plast);
	mostrarModal("#ayuda");
}

function Msgtelfayuda(){
	var p="<p>";
	var plast="</p>";
	var mensaje="<ol><li>Es un campo obligatorio.</li><li>Se permiten solo n&uacute;meros.</li><li>Para telefono son 6 d&iacute;gitos y para celular son 9 d&iacute;gitos.</li></ol>";
	$("#ayuda").html(p+mensaje+plast);
	mostrarModal("#ayuda");
}

function Msgemailayuda(){
	var p="<p>";
	var plast="</p>";
	var mensaje="<ol><li>Es un campo obligatorio.</li><li>Un ejemplo de direccion valida: minic@gcode.com</li></ol>";
	$("#ayuda").html(p+mensaje+plast);
	mostrarModal("#ayuda");
}

function Msgpassayuda(){
	var p="<p>";
	var plast="</p>";
	var mensaje="<ol><li>Es un campo obligatorio.</li><li>Debe tener una longitud m&iacute;nima de 10 caracteres.</li></ol>";
	$("#ayuda").html(p+mensaje+plast);
	mostrarModal("#ayuda");
}

function Msgconfirpassayuda(){
	var p="<p>";
	var plast="</p>";
	var mensaje="<ol><li>Es un campo obligatorio.</li><li>Debe tener el mismo contenido de Contrase&ntilde;a.</li></ol>";
	$("#ayuda").html(p+mensaje+plast);
	mostrarModal("#ayuda");
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

/*(NO UTILIZADO)El metodo validarLetras permitira que
en un campo se ingresen solamente letras 
tomado de http://garabatoslinux.net/validar-solo-numeros-o-letras-en-javascript.html*/
function validarLetras(e) { // 1
    tecla = (document.all) ? e.keyCode : e.which; 
    if (tecla==8) return true; // backspace
	if (tecla==32) return true; // espacio
	if (e.ctrlKey && tecla==86) { return true;} //Ctrl v
	if (e.ctrlKey && tecla==67) { return true;} //Ctrl c
	if (e.ctrlKey && tecla==88) { return true;} //Ctrl x

	patron = /[a-zA-Z]/; //patron

	te = String.fromCharCode(tecla); 
	return patron.test(te); // prueba de patron
}	

/*(NO UTILIZADO)El metodo validarNumeros permitira que
en un campo se ingresen solamente numeros
tomado de http://garabatoslinux.net/validar-solo-numeros-o-letras-en-javascript.html*/
function validarNumeros(e) { // 1
	tecla = (document.all) ? e.keyCode : e.which; // 2
	if (tecla==8) return true; // backspace
	if (tecla==109) return true; // menos
    if (tecla==110) return true; // punto
	if (tecla==189) return true; // guion
	if (e.ctrlKey && tecla==86) { return true}; //Ctrl v
	if (e.ctrlKey && tecla==67) { return true}; //Ctrl c
	if (e.ctrlKey && tecla==88) { return true}; //Ctrl x
	if (tecla>=96 && tecla<=105) { return true;} //numpad

	patron = /[0-9]/; // patron

	te = String.fromCharCode(tecla); 
	return patron.test(te); // prueba
}


