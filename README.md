# Clínica Online

Sistema de gestión de turnos para nuestra Clinica Online con el que podrán gestionar e interactuar tanto profesionales prestadores de servicio como los pacientes que requieran cualquier tipo de atención brindado.


# :information_source: ¿Qué funcionalidades cumple actualmente el sistema?
- Gestión de perfiles para pacientes, especialistas y administradores.
- Configuración flexible de horarios para que los especialistas detallen cuando se encuentran trabajando.
- Metodología dinámica y amigable para la solicitud de turnos por parte de los pacientes.
- Seguimiento de turnos por todos los usuarios.
- Control de cartillas médicas: Podrás ver en cualquier momento lo cargado por un profesional en cada turno realizado.


# :information_source: ¿Cómo funciona la aplicación?

El sistema presenta una interfaz similar para cada usuario, diferenciando los accesos acorde al perfil del mismo.
Se encuentra totalmente orientado a la facilidad de gestión y que cada perfil solo tenga acceso a aquellos sectores con los cuales pueda interactuar.

# :information_source: ¿Contenido de la aplicación?

## Bienvenida

Página inicial donde cualquier usuario no identificado podrá indicar si quiere identificarse o registrar una nueva cuenta con su correo.

![Bienvenida](src/assets/readme/bienvenida.JPG "Página de bienvenida")

## Login de usuario

Permitirá acceder al sistema con una cuenta de usuario previamente registrada, validada y, en el caso de los especialistas, aprobada por un administrador.
Posee un contenedor con botones para faciliar el acceso con usuarios de distintos perfiles del lado derecho.

![Login](src/assets/readme/login.JPG "Formulario de login")

## Registro de usuario

Al momento de registrarnos desde el menú de bienvenida, nos van a solicitar indicar el tipo de cuenta que crearemos: Paciente o Especialista.
Cada formulario tiene sus campos necesarios con distintas validaciones, todos los usuarios deberán comprobar su correo mediante el link enviado a su casilla personal. Tenga en cuenta que en el caso de un usuario Especialista se requerirá además, la aprobación de un administrador antes de realizar el inicio de sesión.

![Registro](src/assets/readme/registro.gif "Formulario de registro")

## Home

Es la pantalla inicial donde cada usuario va a visualizar la barra de navegación superior con todos los accesos a los menús que pueda ingresar.

![Home](src/assets/readme/home.JPG "Page home")

## Sección Usuarios

Permitirá a los administradores visualizar a todos los usuarios registrados con sus datos, habilitar o deshabilitar a los especialistas y realizar el alta de nuevas cuentas de usuarios.

![Usuarios](src/assets/readme/usuarios.gif "Sección´Usuarios")

## Sección Turnos

Permitirá a los administradores visualizar todos los turnos del sistema. Incluye filtros para seleccionar especialistas y especialidades. Podrá cancelar turnos siempre y cuando especifique algún motivo.

![Turnos](src/assets/readme/turnos.gif "Sección Turnos")

# :information_source: Hosting

La web se encuentra hosteada en firebase, para poder acceder a la última versión estable deployada puede ingresar al siguiente link

## https://hospital-jrodicio.web.app/

# :information_source: Construido con:
* [Angular](https://angular.io/)
* [Bootstrap](https://getbootstrap.com/)
* [Firebase](https://firebase.google.com/)
