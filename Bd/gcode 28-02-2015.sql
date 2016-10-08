-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2015 a las 01:35:36
-- Versión del servidor: 5.6.20
-- Versión de PHP: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gcode`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_estado_usuario`(IN `idusuario` INT)
    NO SQL
UPDATE 
	usuario 
SET 
	usuario.idEstado=3 
WHERE 
	usuario.idusuario=idusuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `categoria_lista`()
SELECT 
  categoria.idcategoria,
  categoria.descripcion_categoria,
  categoria.abreviatura_categoria,
  categoria.for_class
FROM
  categoria$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `curso_lista`()
SELECT 
  c.idcurso,
  c.descripcion_curso
FROM
  curso c$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `curso_lista_por_categoria`(IN `idcategoria` INT(11))
SELECT 
  c.idcurso,
  c.descripcion_curso
FROM
  curso c
WHERE
  c.idcategoria=idcategoria$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `detalle_curso_lista`(IN `idcurso` INT(11))
SELECT 
  detalle_curso.iddetalle_curso,
  detalle_curso.descripcion_detalle_curso  
FROM
  detalle_curso
WHERE
  detalle_curso.idcurso = idcurso$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `detalle_inscripcion_cursos`(
  IN idusuario	int(11)
)
SELECT 
  di.iddetalle_inscripcion,
  di.idcurso,
  c.descripcion_curso,
  i.fecha_inscripcion
FROM
  detalle_inscripcion di
INNER JOIN inscripcion i ON (i.idinscripcion=di.idinscripcion)
INNER JOIN matricula m ON (m.idmatricula=i.idmatricula)
INNER JOIN curso c ON (c.idcurso=di.idcurso)
WHERE
  m.idusuario=idusuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `evento_listar`(
)
SELECT 
  e.idevento,
  e.idtipo_evento,
  te.descripcion_tipo_evento,
  e.descripcion_evento,
  e.fecha_evento,
  e.observaciones_evento
FROM
  evento e
INNER JOIN tipo_evento te ON (te.idtipo_evento=e.idtipo_evento)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lista_nivel_por_curso`(IN `idcurso` INT)
    NO SQL
select nc.idnivel,n.descripcion_nivel
from nivel n
inner join nivel_curso nc
on n.idnivel=nc.idnivel
where nc.idcurso=idcurso$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `loginusuario`(IN `e_mail` VARCHAR(50), IN `pass` VARCHAR(40))
BEGIN
	declare error integer default 0;
	declare continue HANDLER FOR SQLEXCEPTION
	BEGIN
		SET @error=1;
	END;
	select idpersona,idusuario from usuario where email=e_mail and contraseña= pass;
	IF @error=1 THEN
		ROLLBACK;
	ELSE
		COMMIT;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `persona_ver_datos`(
  IN idpersona int(11)
)
SELECT 
  p.nombres,
  p.apellidos,
  p.fechaNacimiento,
  p.telefono,
  s.descripcion AS sexo,
  u.descripcion AS universidad
FROM
  persona p
INNER JOIN sexo s ON (s.idsexo=p.idsexo)
INNER JOIN universidades u ON (u.iduniversidad=p.iduniversidad)
WHERE
  p.idpersona=idpersona$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_conocimientos`(IN `idusuario` INT, IN `conocimiento` VARCHAR(50), IN `experiencia` INT, IN `tiempo` VARCHAR(5))
    NO SQL
insert into conocimientos(conocimiento,Experiencia,tiempo,idusuario) values (conocimiento,experiencia,tiempo,idusuario)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_preferencias`(IN `idusuario` INT, IN `idcurso` INT, IN `idnivel` INT, IN `idmodalidad` INT, IN `precio` DECIMAL, IN `nroparticipantes` INT, IN `recomendaciones` TEXT)
    NO SQL
insert into preferencias(idusuario,IdCurso,IdNivel,IdModalidad,precio,NroParticipantes,Recomendaciones) values (idusuario,idcurso,idnivel,idmodalidad,precio,nroparticipantes,recomendaciones)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_usuario`(IN `nombres` VARCHAR(50), IN `apellidos` VARCHAR(50), IN `fechanac` DATE, IN `telf` INT(9), IN `sexo` INT, IN `universidad` INT, IN `email` VARCHAR(50), IN `pass` VARCHAR(40))
BEGIN
	declare idenpersona int;
	declare error integer default 0;
	declare continue HANDLER FOR SQLEXCEPTION
    BEGIN
		SET @error=1;
	END;
    START TRANSACTION;
	insert into persona (nombres,apellidos,fechaNacimiento,telefono,idsexo,iduniversidad) values (nombres,apellidos,fechanac,telf,sexo,universidad);
	set @idenpersona=(select max(idpersona) from persona);
	insert into usuario(email,contraseña,idpersona,idEstado) values (email,pass,@idenpersona,2);
	IF @error=1 THEN
		ROLLBACK;
	ELSE
		COMMIT;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usuario_foto`(
  IN idusuario	int(11)
)
SELECT 
 u.foto
FROM
  usuario u
WHERE
  u.idusuario=idusuario$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
`idcategoria` int(11) NOT NULL,
  `descripcion_categoria` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `abreviatura_categoria` varchar(4) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `for_class` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `descripcion_categoria`, `abreviatura_categoria`, `for_class`) VALUES
(1, 'Base de Datos', 'BD', 'tab-marketing'),
(2, 'Desarrollo de Aplicaciones', 'DAP', 'tab-development'),
(3, 'Inteligencia de Negocios', 'ING', 'tab-designandux');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conocimientos`
--

CREATE TABLE IF NOT EXISTS `conocimientos` (
`IdConocimientos` int(11) NOT NULL,
  `conocimiento` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Experiencia` int(11) NOT NULL,
  `tiempo` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `idusuario` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `conocimientos`
--

INSERT INTO `conocimientos` (`IdConocimientos`, `conocimiento`, `Experiencia`, `tiempo`, `idusuario`) VALUES
(1, 'aaaaaaaaaaa', 1, 'meses', 2),
(2, 'iiiiiiiiiiiiiiiiii', 3, 'meses', 2),
(3, 'uuuuuuuuuuuuuu', 2, 'meses', 2),
(4, 'eeeeeeeeee', 1, 'meses', 2),
(5, 'oooooooooo', 3, 'meses', 2),
(6, 'bbbbbbbbbbbbbb', 1, 'meses', 2),
(7, 'ccccccccc', 1, 'meses', 2),
(8, '', 0, 'años', 2),
(9, '<script>alert("hola")</script>', 2, 'meses', 2),
(10, 'ghfhgf', 5, 'años', 2),
(11, 'siiiii', 2, 'meses', 2),
(12, 'ghfgf', 3, 'meses', 2),
(13, 'hola', 4, 'meses', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE IF NOT EXISTS `curso` (
`idcurso` int(11) NOT NULL,
  `idcategoria` int(11) NOT NULL,
  `descripcion_curso` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `abreviatura_curso` varchar(4) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`idcurso`, `idcategoria`, `descripcion_curso`, `abreviatura_curso`) VALUES
(1, 1, 'MySql', NULL),
(2, 1, 'Oracle', NULL),
(3, 1, 'SqlServer', NULL),
(4, 2, 'Diseño Web', NULL),
(5, 2, 'Programación Backend', NULL),
(6, 2, 'Repositorios de Código', NULL),
(7, 2, 'Frontend', NULL),
(8, 2, 'Administración de Servidores', NULL),
(9, 2, 'Javascript y Librerías', NULL),
(10, 2, 'PHP con Frameworks', NULL),
(11, 2, 'Android', NULL),
(12, 3, 'Pentaho', NULL),
(13, 3, 'SqlServer', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_curso`
--

CREATE TABLE IF NOT EXISTS `detalle_curso` (
`iddetalle_curso` int(11) NOT NULL,
  `idcurso` int(11) NOT NULL,
  `idnivel` int(11) NOT NULL,
  `descripcion_detalle_curso` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=70 ;

--
-- Volcado de datos para la tabla `detalle_curso`
--

INSERT INTO `detalle_curso` (`iddetalle_curso`, `idcurso`, `idnivel`, `descripcion_detalle_curso`) VALUES
(1, 1, 1, 'Instalación de MySql'),
(2, 1, 1, 'Puesta en marcha'),
(3, 1, 1, 'Configuración'),
(4, 1, 1, 'Panel de Administración'),
(5, 1, 1, 'Scripts de Administración'),
(6, 1, 1, 'Ide''s Administración'),
(7, 1, 1, 'Operaciones CRUD'),
(8, 2, 1, 'Instalación de Oracle'),
(9, 2, 1, 'Puesta en marcha'),
(10, 2, 1, 'Configuración'),
(11, 2, 1, 'Panel de Administración'),
(12, 2, 1, 'Scripts de Administración'),
(13, 2, 1, 'Ide''s de Administración'),
(14, 2, 1, 'Operaciones CRUD'),
(15, 3, 1, 'Instalación de SqlSever'),
(16, 3, 1, 'Puesta en marcha'),
(17, 3, 1, 'Configuración'),
(18, 3, 1, 'Panel de Administración'),
(19, 3, 1, 'Scripts de Administración'),
(20, 3, 1, 'Operaciones CRUD'),
(21, 4, 1, 'Introducción al Diseño Web'),
(22, 4, 1, 'Responsive'),
(23, 4, 1, 'First Mobile'),
(24, 4, 1, 'Html 5'),
(25, 4, 1, 'Css 3'),
(26, 5, 1, 'Los mejores lenguajes de programación'),
(27, 5, 1, 'Frameworks'),
(28, 5, 1, 'ORM'),
(29, 5, 1, 'Ide''s de desarrollo'),
(30, 6, 1, 'Instalación'),
(31, 6, 1, 'Configuración'),
(32, 6, 1, 'Puesta en marcha de proyectos'),
(33, 7, 1, 'Introducción a Frontend'),
(34, 7, 1, 'Herramientas esenciales'),
(35, 7, 1, 'Ide''s'),
(36, 7, 1, 'Buenas prácticas'),
(37, 8, 1, 'Instalación de Windows Server'),
(38, 8, 1, 'Instalación de Ubuntu Server'),
(39, 8, 1, 'DNS'),
(40, 8, 1, 'Correo'),
(41, 8, 1, 'Aplicaciones'),
(42, 8, 1, 'Proxy'),
(43, 9, 1, 'Javascript'),
(44, 9, 1, 'Jquery'),
(45, 9, 1, 'Jquery-ui'),
(46, 9, 1, 'Angular.js'),
(47, 9, 1, 'Node.js'),
(48, 10, 1, 'PHP'),
(49, 10, 1, 'Laravel'),
(50, 10, 1, 'CodeIgniter'),
(51, 10, 1, 'Yii'),
(52, 10, 1, 'Zend'),
(53, 10, 1, 'Symfony'),
(54, 11, 1, 'Instalación del entorno'),
(55, 11, 1, 'Programación básica'),
(56, 11, 1, 'Interacción BD'),
(57, 11, 1, 'Servicios REST'),
(58, 11, 1, 'Maps'),
(59, 12, 1, 'Instalación del entorno'),
(60, 12, 1, 'Data Integration'),
(61, 12, 1, 'Business Analytics'),
(62, 12, 1, 'Reporting'),
(63, 12, 1, 'Big Data'),
(64, 13, 1, 'BI con herramientas Microsoft'),
(65, 13, 1, 'Configuración de SqlServer BI'),
(66, 13, 1, 'Modelado de soluciones OLAP'),
(67, 13, 1, 'SSIS'),
(68, 13, 1, 'SSAS'),
(69, 13, 1, 'SSRS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_inscripcion`
--

CREATE TABLE IF NOT EXISTS `detalle_inscripcion` (
`iddetalle_inscripcion` int(11) NOT NULL,
  `idinscripcion` int(11) NOT NULL,
  `idcurso` int(11) NOT NULL,
  `idevento` int(11) DEFAULT NULL,
  `fecha_detalle_inscripcion` date NOT NULL,
  `observacion_detalle_inscripcion` text COLLATE utf8_spanish_ci
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `detalle_inscripcion`
--

INSERT INTO `detalle_inscripcion` (`iddetalle_inscripcion`, `idinscripcion`, `idcurso`, `idevento`, `fecha_detalle_inscripcion`, `observacion_detalle_inscripcion`) VALUES
(2, 2, 1, NULL, '2015-02-12', NULL),
(3, 2, 4, NULL, '2015-02-12', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE IF NOT EXISTS `estado` (
`idEstado` int(1) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `descripcion`) VALUES
(1, 'Verificar Correo'),
(2, 'Cuenta Activada'),
(3, 'Verificacion Colaborador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE IF NOT EXISTS `evento` (
`idevento` int(11) NOT NULL,
  `idtipo_evento` int(11) NOT NULL,
  `descripcion_evento` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha_evento` date NOT NULL,
  `observaciones_evento` text COLLATE utf8_spanish_ci
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`idevento`, `idtipo_evento`, `descripcion_evento`, `fecha_evento`, `observaciones_evento`) VALUES
(5, 5, 'Desarrollo Web:\r\n- Html5\r\n- CSS3\r\n- Javascript\r\n- Php', '2015-02-07', NULL),
(6, 5, 'Desarrollo Móvil:\r\n- Android', '2015-02-07', NULL),
(7, 6, 'Seminarion de Actualización de Ingeniería', '2015-02-12', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE IF NOT EXISTS `inscripcion` (
`idinscripcion` int(11) NOT NULL,
  `idmatricula` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `observacion_inscripcion` text COLLATE utf8_spanish_ci
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`idinscripcion`, `idmatricula`, `fecha_inscripcion`, `observacion_inscripcion`) VALUES
(2, 3, '2015-02-12', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

CREATE TABLE IF NOT EXISTS `matricula` (
`idmatricula` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `fecha_matricula` date NOT NULL,
  `pago` decimal(4,0) NOT NULL,
  `observacion_matricula` text COLLATE utf8_spanish_ci
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `matricula`
--

INSERT INTO `matricula` (`idmatricula`, `idusuario`, `fecha_matricula`, `pago`, `observacion_matricula`) VALUES
(3, 5, '2015-02-12', '50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidad`
--

CREATE TABLE IF NOT EXISTS `modalidad` (
  `IdModalidad` int(11) NOT NULL,
  `Descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `modalidad`
--

INSERT INTO `modalidad` (`IdModalidad`, `Descripcion`) VALUES
(1, 'Gratis'),
(2, 'Pagado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE IF NOT EXISTS `nivel` (
`idnivel` int(11) NOT NULL,
  `descripcion_nivel` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `abreviatura_nivel` varchar(4) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`idnivel`, `descripcion_nivel`, `abreviatura_nivel`) VALUES
(1, 'Básico', NULL),
(2, 'Intermedio', NULL),
(3, 'Avanzado', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_curso`
--

CREATE TABLE IF NOT EXISTS `nivel_curso` (
  `idcurso` int(11) NOT NULL DEFAULT '0',
  `idnivel` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `nivel_curso`
--

INSERT INTO `nivel_curso` (`idcurso`, `idnivel`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(1, 3),
(5, 3),
(7, 3),
(9, 3),
(10, 3),
(11, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE IF NOT EXISTS `persona` (
`idpersona` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` int(9) NOT NULL,
  `idsexo` int(11) NOT NULL,
  `iduniversidad` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idpersona`, `nombres`, `apellidos`, `fechaNacimiento`, `telefono`, `idsexo`, `iduniversidad`) VALUES
(4, 'Wilson Hernande', 'Neira Mija', '1993-04-04', 983333333, 1, 1),
(5, 'erere', 'efdafdsaf', '1333-03-12', 324323, 1, 1),
(6, '', 'dfsdfd', '0212-02-12', 33445455, 1, 1),
(7, '', 'dfsdfd', '0212-02-12', 33445455, 1, 1),
(8, 'hgfhgttryru', 'fsdfdsf', '2453-03-12', 765654654, 1, 1),
(9, 'Carlos', 'Nole', '1989-12-22', 344083, 1, 1),
(12, 'Tavo', 'Sanchez', '1996-12-30', 398274389, 1, 1),
(13, 'Mary', 'Vilchez Palacios', '1992-05-12', 29832918, 2, 1),
(14, 'Juan', 'Carmen', '1992-03-12', 823821783, 1, 1),
(15, 'Robert', 'Martinez', '1992-03-12', 328973987, 1, 1),
(18, 'Jose', 'Saavedra', '1989-02-10', 989787576, 1, 1),
(19, 'Jocsely', 'Peña', '1991-03-11', 979887687, 1, 1),
(20, 'Jdhfgd', 'Ndjhgdh', '1992-03-04', 879837436, 1, 1),
(21, 'Hdgdggsgs', 'Hdgddttt', '1991-06-05', 789687678, 1, 1),
(22, 'Gkjhjkh', 'Hyruurur', '1992-12-31', 879887765, 1, 1),
(23, 'Khfdsdjhjdsjka', 'Drjrjheuue', '1992-03-03', 868767364, 1, 2),
(24, 'Oooooooo', 'Uuuuuuuuuu', '1991-03-12', 253564254, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE IF NOT EXISTS `preferencias` (
`IdPreferencias` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `IdCurso` int(11) NOT NULL,
  `IdNivel` int(11) NOT NULL,
  `IdModalidad` int(11) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `NroParticipantes` int(11) NOT NULL,
  `Recomendaciones` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`IdPreferencias`, `idusuario`, `IdCurso`, `IdNivel`, `IdModalidad`, `precio`, `NroParticipantes`, `Recomendaciones`) VALUES
(3, 5, 3, 1, 2, '10', 15, 'jajajaaja'),
(4, 5, 4, 1, 1, '0', 15, 'sisisisisi falla'),
(5, 4, 3, 1, 1, '0', 20, ''),
(6, 4, 4, 1, 1, '0', 25, 'akjhfjdshkfjds'),
(7, 4, 2, 1, 1, '0', 20, 'jhgjgjhgjhg'),
(8, 4, 4, 1, 2, '10', 20, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexo`
--

CREATE TABLE IF NOT EXISTS `sexo` (
`idsexo` int(11) NOT NULL,
  `descripcion` varchar(15) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `sexo`
--

INSERT INTO `sexo` (`idsexo`, `descripcion`) VALUES
(1, 'Masculino'),
(2, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE IF NOT EXISTS `tipousuario` (
`idTipoUsuario` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`idTipoUsuario`, `descripcion`) VALUES
(1, 'Usuario'),
(2, 'Colaborador'),
(3, 'Gcode');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_evento`
--

CREATE TABLE IF NOT EXISTS `tipo_evento` (
`idtipo_evento` int(11) NOT NULL,
  `descripcion_tipo_evento` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `tipo_evento`
--

INSERT INTO `tipo_evento` (`idtipo_evento`, `descripcion_tipo_evento`) VALUES
(5, 'Taller'),
(6, 'Seminario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `universidades`
--

CREATE TABLE IF NOT EXISTS `universidades` (
`iduniversidad` int(11) NOT NULL,
  `descripcion` varchar(70) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `universidades`
--

INSERT INTO `universidades` (`iduniversidad`, `descripcion`) VALUES
(1, 'Universidad Nacional de Piura'),
(2, 'Universidad de Piura'),
(3, 'Universidad Cesar Vallejo'),
(4, 'Universidad Alas Peruanas'),
(5, 'Universidad Católica los Angeles de Chimbote'),
(6, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
`idusuario` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(40) DEFAULT NULL,
  `idpersona` int(11) DEFAULT NULL,
  `foto` blob,
  `idEstado` int(1) NOT NULL,
  `idTipoUsuario` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `email`, `contraseña`, `idpersona`, `foto`, `idEstado`, `idTipoUsuario`) VALUES
(1, 'dshs@hdss', '4bfb242886d433c2168dfdee01331f96', 7, NULL, 2, 1),
(2, 'dsjhkjfdhs@hdss', '18ef25b59079b7210a0040e48c5e5a5a', 5, NULL, 3, 1),
(3, 'jhgsdg@kjhj', '421deec5a6f0f3dbee9e1b9f58546903', 8, NULL, 2, 1),
(4, 'wilsonnm22@hotmail.com', 'abd7372bba55577590736ef6cb3533c6', 4, NULL, 2, 1),
(5, 'carnol1989@hotmail.com', 'e807f1fcf82d132f9bb018ca6738a19f', 9, NULL, 2, 1),
(6, 'tavo@hotmail.com', '531ed40bb85b32c3d8d845b36596b700', 12, NULL, 2, 1),
(7, 'mary@gmail.com', '1ae1b847b0ebb8378f3317353007d402', 13, NULL, 2, 1),
(8, 'juan@hotmail.com', '21149473eefb4dbce8e725ee0b4df3d2', 14, NULL, 2, 1),
(9, 'robert@hotmail.com', '5f70b1271ed07fdcfa44e4dc8218554a', 15, NULL, 2, 1),
(12, 'jose@hotmail.com', '4bbcea08d09eefd3faa6e2ee4c72fd7f', 18, NULL, 2, 1),
(13, 'jocsely@hotmail.com', '2e4e68821b98b3d969ded980248838f3', 19, NULL, 2, 1),
(14, 'jkdhs@kjh.jjdhjs', '9ebdd50e651543122ea7deab77395207', 20, NULL, 2, 1),
(15, 'jhj@jhj.jhhhj', 'e807f1fcf82d132f9bb018ca6738a19f', 21, NULL, 2, 1),
(16, 'jjjjj@gggg.hhhh', 'e807f1fcf82d132f9bb018ca6738a19f', 22, NULL, 2, 1),
(17, 'jajajajja@jajaj.com', 'e807f1fcf82d132f9bb018ca6738a19f', 23, NULL, 2, 0),
(18, 'oooo@ooo.com', 'e807f1fcf82d132f9bb018ca6738a19f', 24, NULL, 2, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
 ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `conocimientos`
--
ALTER TABLE `conocimientos`
 ADD PRIMARY KEY (`IdConocimientos`), ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
 ADD PRIMARY KEY (`idcurso`), ADD KEY `curso_idcategoria` (`idcategoria`);

--
-- Indices de la tabla `detalle_curso`
--
ALTER TABLE `detalle_curso`
 ADD PRIMARY KEY (`iddetalle_curso`), ADD KEY `detalle_curso_idcurso` (`idcurso`), ADD KEY `detalle_curso_idnivel` (`idnivel`);

--
-- Indices de la tabla `detalle_inscripcion`
--
ALTER TABLE `detalle_inscripcion`
 ADD PRIMARY KEY (`iddetalle_inscripcion`), ADD KEY `idinscripcion` (`idinscripcion`), ADD KEY `idcurso` (`idcurso`), ADD KEY `idevento` (`idevento`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
 ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
 ADD PRIMARY KEY (`idevento`), ADD KEY `idtipo_evento` (`idtipo_evento`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
 ADD PRIMARY KEY (`idinscripcion`), ADD KEY `idmatricula` (`idmatricula`);

--
-- Indices de la tabla `matricula`
--
ALTER TABLE `matricula`
 ADD PRIMARY KEY (`idmatricula`), ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `nivel`
--
ALTER TABLE `nivel`
 ADD PRIMARY KEY (`idnivel`);

--
-- Indices de la tabla `nivel_curso`
--
ALTER TABLE `nivel_curso`
 ADD PRIMARY KEY (`idcurso`,`idnivel`), ADD KEY `fk_idnivel` (`idnivel`), ADD KEY `idcurso` (`idcurso`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
 ADD PRIMARY KEY (`idpersona`), ADD KEY `fk_personasexo` (`idsexo`), ADD KEY `fk_personauniversidad` (`iduniversidad`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
 ADD PRIMARY KEY (`IdPreferencias`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
 ADD PRIMARY KEY (`idsexo`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
 ADD PRIMARY KEY (`idTipoUsuario`);

--
-- Indices de la tabla `tipo_evento`
--
ALTER TABLE `tipo_evento`
 ADD PRIMARY KEY (`idtipo_evento`);

--
-- Indices de la tabla `universidades`
--
ALTER TABLE `universidades`
 ADD PRIMARY KEY (`iduniversidad`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
 ADD PRIMARY KEY (`idusuario`), ADD KEY `fk_personausuario` (`idpersona`), ADD KEY `estado` (`idEstado`), ADD KEY `idtipousuario` (`idTipoUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `conocimientos`
--
ALTER TABLE `conocimientos`
MODIFY `IdConocimientos` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
MODIFY `idcurso` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `detalle_curso`
--
ALTER TABLE `detalle_curso`
MODIFY `iddetalle_curso` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT de la tabla `detalle_inscripcion`
--
ALTER TABLE `detalle_inscripcion`
MODIFY `iddetalle_inscripcion` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
MODIFY `idEstado` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
MODIFY `idevento` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
MODIFY `idinscripcion` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `matricula`
--
ALTER TABLE `matricula`
MODIFY `idmatricula` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `nivel`
--
ALTER TABLE `nivel`
MODIFY `idnivel` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
MODIFY `idpersona` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
MODIFY `IdPreferencias` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `sexo`
--
ALTER TABLE `sexo`
MODIFY `idsexo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
MODIFY `idTipoUsuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tipo_evento`
--
ALTER TABLE `tipo_evento`
MODIFY `idtipo_evento` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `universidades`
--
ALTER TABLE `universidades`
MODIFY `iduniversidad` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conocimientos`
--
ALTER TABLE `conocimientos`
ADD CONSTRAINT `conocimientos_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
ADD CONSTRAINT `curso_idcategoria` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`);

--
-- Filtros para la tabla `detalle_curso`
--
ALTER TABLE `detalle_curso`
ADD CONSTRAINT `detalle_curso_idcurso` FOREIGN KEY (`idcurso`) REFERENCES `nivel_curso` (`idcurso`),
ADD CONSTRAINT `detalle_curso_idnivel` FOREIGN KEY (`idnivel`) REFERENCES `nivel_curso` (`idnivel`);

--
-- Filtros para la tabla `detalle_inscripcion`
--
ALTER TABLE `detalle_inscripcion`
ADD CONSTRAINT `detalle_inscripcion_ibfk_1` FOREIGN KEY (`idcurso`) REFERENCES `curso` (`idcurso`),
ADD CONSTRAINT `detalle_inscripcion_ibfk_2` FOREIGN KEY (`idevento`) REFERENCES `evento` (`idevento`),
ADD CONSTRAINT `detalle_inscripcion_ibfk_3` FOREIGN KEY (`idinscripcion`) REFERENCES `inscripcion` (`idinscripcion`);

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
ADD CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`idtipo_evento`) REFERENCES `tipo_evento` (`idtipo_evento`);

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
ADD CONSTRAINT `inscripcion_ibfk_2` FOREIGN KEY (`idmatricula`) REFERENCES `matricula` (`idmatricula`);

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
ADD CONSTRAINT `matricula_ibfk_2` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `nivel_curso`
--
ALTER TABLE `nivel_curso`
ADD CONSTRAINT `fk_idcurso` FOREIGN KEY (`idcurso`) REFERENCES `curso` (`idcurso`),
ADD CONSTRAINT `fk_idnivel` FOREIGN KEY (`idnivel`) REFERENCES `nivel` (`idnivel`);

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
ADD CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`idsexo`) REFERENCES `sexo` (`idsexo`),
ADD CONSTRAINT `persona_ibfk_2` FOREIGN KEY (`iduniversidad`) REFERENCES `universidades` (`iduniversidad`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
