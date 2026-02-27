# GestorDeOpinionesPMA
Gestor de opiniones laboratorio Educativo IN6AV PMA

Este Gestor de opiniones esta hecho con .NET Para el servicio de AuthService, PostgresDB para la base de datos del AuthService, NODE.js y MongoDB para el manejo de opiniones y comentarios.


AuthService: 
Funciona a traves de un sistema que permite la verificacion de un usuario mandandole un token de la libreria JWT (el cual se encarga de todos los tokens mandados en este proyecto) a traves del correo electronico esto permite mantener un mejor manejo de usuarios activos y no activos, todo esto adentro de la base de datos en Postgres la cual estaba previamente configurada y conectada a traves de nuestras configuraciones del proyecto.
El AuthService nos incluye los siguientes servicios:
    tipo                   | Peticion HTTP
    ----------------------nivel Administrativo---------------------------
    -Buscar un usuario     http://localhost:5210/api/v1/users/ID_USUARIO/roles
    segun su rol
    -Listar usuarios       http://localhost:5210/api/v1/users/by-role/ROL_A_BUSCAR
    segun su rol
    ----------------------nivel Publico----------------------------------
    -Registro de Usuarios    http://localhost:5210/api/v1/auth/register
    -Verificacion de Email   http://localhost:5210/api/v1/auth/verify-email
    -Login de usuario        http://localhost:5210/api/v1/auth/login
    
Al momento de logearse el sistema genera y proporciona un token el cual nos servira para crear una opinion o comentario sobre una opinion.

Servicio de Opiniones y comentarios:
Manejado a travez de una jerarquia de recursos la cual a traves de las URL manejaremos como parametro con una logica de autoría que nos permite que cada registro de una opinion o comentario solo pueda ser manejado a traves de los token del logeo de un usuario esto ayudandonos a que ningun otro usuario pueda editar o borrar una opinion o comentario que no sea de su autoria
