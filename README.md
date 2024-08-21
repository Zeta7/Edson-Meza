# Proyecto Node.js con TypeScript, Prisma y MongoDB

Este proyecto es una aplicación Node.js construida con TypeScript, utilizando Prisma como ORM y MongoDB como base de datos. A continuación, se explica cómo correr el proyecto en tu entorno local.

## Requisitos previos

Antes de empezar, asegúrate de tener los siguientes requisitos instalados:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) como gestor de paquetes
- [MongoDB](https://www.mongodb.com/) (puedes usar MongoDB Atlas o una instancia local)

## Pasos para correr el proyecto

1. **Clona el repositorio**

   Clona el repositorio a tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   cd nombre-del-repositorio

2. **Configura las variables de entorno**

   Crea un archivo .env en la raíz del proyecto copiando el contenido del archivo .env.example:

   ```bash
   cp .env.example .env

3. **Instala las dependencias**

   Instala las dependencias necesarias utilizando npm o yarn:

   Con npm:
   ```bash
   npm install

4. **Genera el cliente de Prisma**

   Prisma necesita generar el cliente basado en tu esquema definido en prisma/schema.prisma. Ejecuta el siguiente comando:

   ```bash
   npx prisma generate

   Este paso es esencial para que Prisma pueda interactuar con tu base de datos MongoDB.

5. **Clona el repositorio**

   Una vez que todo esté configurado, puedes iniciar el servidor con el siguiente comando:

   Con npm:

   ```bash
   npm run start

6. **Accede a la documentación de Swagger**

   Una vez que el servidor esté corriendo, puedes acceder a la documentación de la API generada automáticamente por Swagger visitando el siguiente enlace en tu navegador:

   http://localhost:3000/docs

   Aquí podrás ver y probar todas las rutas de la API expuestas por el proyecto.







