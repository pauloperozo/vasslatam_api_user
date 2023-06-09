# API de Usuarios 👤

Esta API permite gestionar usuarios por medio de unos endpoint.
Se compone en esencia de dos rutas, cuyo controladores permite por cada entidad:

    * ``Auth:``
    * Permite Registrar Usurios Administrador.
    * Permite Autenticar Los Usuarios ( login,password).

    * ``Users:``
    * Permite Listar Usuarios Creados  De Una Cuenta Administrador.
    * Permite Ver Informacion De Un Usuario.
    * Permite Editar Un Usuario.
    * Permite Borrar Un Usuario.
    * Permite Ver Reporte De Usuarios Y Filtrarlos Por Sus Campos.
    * Permite Cambiar Contraseña.

## Variables de entorno
En el archivo ``.env``se encuentran las variables de entorno que a saber son:

  * HOST=localhost
  * PORT=3000 (puerto en que correra el servicio)
  * TIMEOUT=7000 (tiempo máximo de espera por una petición)
  * DATABASE_URL= url para conectar a mongodb atlas o mongodb server

## Construido con 🛠️

* [Nodejs](https://nodejs.org) - Entorno de ejecuciónJS.
* [Express](https://expressjs.com/es/) - Framework de nodejs utilizado ES6.
* [Typescrip](https://www.typescriptlang.org/) - Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases.
* [Mongo Atlas](https://www.mongodb.com/atlas) -  plataforma de datos para aplicaciones multicloud basada en mongodb ( Mongodb en la nube ).
* [npm](https://www.npmjs.com/) - Permite instalar diversas librerías utilizadas en el proyecto.

## Pre-requisitos 📋

_Necesitas instalar lo siguiente:_ ⚠️

* Instala Nodejs

## Deploy 🚀
_Ejecuta los siguientes pasos en orden:_

### Paso 1 Clona el repositorio: 

  ```$ git clone https://github.com/pauloperozo/vasslatam_api_user``` ⏬

### Paso 2 Entra a la carpeta y ejecuta el siquiente comando: 

  ```$ npm install``` 📂	

Ya con estos dos pasos se tiene el código del proyecto y se instalan las dependencias.

### Paso 3 Runner del proyecto:

   ```$ npm run dev o npm run start``` 
Con este comando se inicia el servicio.


## Pruebas 🚥

Los test se desarrollaron utilizando jest y supertest (se encuentran en dependencias de desarrollo)
Para ejecutar las pruebas, sólo debes utilizar el comando ``npm run test``` ✅.

## Resulado Final 🚥

En el directorio ``Postman`` contendra unos captures de pantalla, mostrando el resultado final, al iniciar los servicios anteriormente mencionados, asi mismo el ``postman_collection`` file para ejcutar pruebas sobre los endpoint.

## Autor ✒️

* **Paulo Perozo** - (#des_paulo) 👤.