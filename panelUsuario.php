<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: login.html");
}
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8"/>

        <link rel="stylesheet" href="css/jquery-ui.css">
        <link rel="stylesheet"  href="css/gc01.css"/>
        <link rel="stylesheet"  href="css/gc02.css"/>        
        <link rel="stylesheet"  href="css/gc03.css"/>
        <link rel="stylesheet"  href="css/gc05.css"/>

        <link rel="icon" href="img/favicon.ico" type="image/x-icon"/>

        <script src="js/jquery.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/app.js"></script>

        <title>Bienvenido a GCode.ln en Español</title>
    </head>
    <body>
        <section id="container">
            <header class="Header">
                <div class="header-logo">
                    <a href="index.html">
                        <img src="img/gcode.png" alt="GCode.ln">
                    </a>
                </div>
                <div class="Header-container u-wrapper u-clearfix header-nav">
                    <div class="Header-menuContainer">
                        <label class="Header-mobileMenu icon-menu" for="MainMenu-callback"></label>
                        <!--<label class="Header-login btn-Red" for="Login-callback">Inscribete</label>-->
                        <input type="checkbox" id="MainMenu-callback" class="MainMenu-callback">
                        <nav class="MainMenu">
                            <ul class="MainMenu-container">
                                <!--li class="MainMenu-option "><a href="QuienesSomos.html" class="MainMenu-link">Qui&eacute;nes somos?</a></li>
                                <li class="MainMenu-option "><a href="Asesoramiento.html" class="MainMenu-link">Asesoramiento</a></li>-->
                                <li class="MainMenu-option "><a id="colaborador" class="MainMenu-link">Colaborador</a></li>
                                <li class="MainMenu-option "><a id="preferencias" class="MainMenu-link">Preferencias</a></li>
                                <li class="MainMenu-option "><a href="php/cerrar_session.php" class="MainMenu-link">Cerrar Sesi&oacute;n</a></li>
                            </ul>
                        </nav>              
                    </div>
                    <div class="usuario">
                        <a><img class="centro" src="img/usuario/user.png"> &nbsp;<b class="centro"><?php echo $_SESSION['usuario']; ?></b></a> 
                        <input id="idpersona" type="hidden" value="<?php echo $_SESSION['idpersona']; ?>" />
                        <input id="idusuario" type="hidden" value="<?php echo $_SESSION['idusuario']; ?>" />
                    </div>
                </div>
            </header> 

            <section class="primer">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 id="bienve">Bienvenido</h3>
                    </div>

                    <div class="izquierda titulo-datos">
                        <div class="panel-foto" id="foto-usuario">
                            <!--p>Foto</p-->
                        </div>
                        <div class="panel-info" id="info-usuario">
                            <p class="titulo-datos" id="ip">Informacion Usuario</p>
                        </div>
                        <div class="panel-curso" id="cursos-usuario">
                            <p class="titulo-datos" id="ip">Cursos</p>
                        </div>
                    </div>
                    <div class="derecha titulo-datos">
                        <div class="panel-evento" id="eventos-plataforma">
                            <p class="titulo-datos" id="ip">  Eventos plataforma  </p>
                        </div>
                    </div>
                    <!--div class="panel-footer"><b>Informaci&oacute;n de Usuario</b></div-->
                </div>
            </section>

            <footer id="footer" class="Footer">
                <div class="Footer-container u-wrapper u-clearfix">
                    <div class="footer-column">
                        <ul>
                            <li>
                                <span class="glyphicon glyphicon-list" aria-hidden="true"></span>
                                <a href="Contactos.html">Cont&aacute;ctenos</a>
                            </li>
                            <li>
                                <img src="img/phone.png">&nbsp;949716348 / 968143991 /984938655 
                            </li>
                            <li>
                                <img src="img/gmail.png">&nbsp;gcode.ln.peru@gmail.com
                            </li>
                            <li>
                                <img src="img/facebook_logo.png">&nbsp;gcodelnperu
                            </li>
                        </ul>

                    </div>		
                </div>
            </footer>
        </section>
    </body>
</html>
