# GuitarLA - Backend (Server)

Este repositorio contiene el backend de la aplicación GuitarLA, un proyecto desarrollado bajo el stack PERN como parte del examen del segundo parcial de la carrera de Ingeniería en Sistemas.

## Tecnologías Utilizadas

A continuación se presenta una tabla detallada con las principales tecnologías y herramientas implementadas en el desarrollo del servidor:

| Tecnología | Descripción |
| --- | --- |
| Node.js | Entorno de ejecución para JavaScript en el servidor. |
| Express.js | Framework web minimalista para la creación y gestión de la API REST. |
| TypeScript | Superset de JavaScript que añade tipado estático, reduciendo errores y mejorando la calidad del código. |
| PostgreSQL | Sistema de gestión de bases de datos relacional (instancia alojada en Neon Console). |
| Sequelize | ORM (Object-Relational Mapping) para representar y manipular datos de PostgreSQL mediante objetos de TypeScript. |
| express-validator | Middleware para el saneamiento y validación de datos en las peticiones HTTP entrantes. |
| dotenv | Módulo empleado para la carga segura de variables de entorno desde un archivo local .env. |

## Temas de Clase Aplicados

Durante la arquitectura y desarrollo de este backend se aplicaron los siguientes conceptos teóricos y prácticos de la materia:

- Creación de REST API.
- Modelado de bases de datos relacionales.
- Configuración de CORS para seguridad e intercambio seguro de recursos con el frontend.
- Manejo seguro de Variables de Entorno para credenciales.
- Tipado estricto de datos, respuestas y peticiones con TypeScript.
- Sincronización automática de tablas utilizando Sequelize.

## Requisitos Previos

Antes de proceder, asegúrese de contar con lo siguiente en su equipo:
- Node.js versión 16 LTS o superior instalada.
- Credenciales de la base de datos de Neon Console a la mano.

## Instrucciones de Instalación

Por favor, siga cuidadosamente la siguiente serie de pasos para preparar el entorno de ejecución:

1. Utilizando una terminal, diríjase a la raíz de la carpeta base del servidor:
```bash
cd server
```

2. Instale todas las dependencias necesarias definidas en el package.json:
```bash
npm install
```

## Configuración de Variables de Entorno

El proyecto requiere un archivo de configuración crítico para establecer la conexión con la base de datos y autorizar peticiones del frontend mediante CORS.

1. En la raíz de la carpeta `server`, cree un archivo de texto plano y nómbrelo estrictamente `.env`.
2. Edite el archivo `.env` añadiendo las siguientes dos variables y reemplazando los valores según la cadena de conexión de Neon Console:

```env
DB_URL=postgresql://usuario:password@host/nombre_base_datos?sslmode=require
FRONTEND_URL=http://localhost:5173
```
Nota: La variable FRONTEND_URL define el origen permitido para realizar consultas a la API.

## Arranque del Proyecto

Una vez completada la instalación de dependencias y la configuración de las variables de entorno, arranque el servidor en modo de desarrollo mediante el siguiente comando:

```bash
npm run dev
```

Un arranque exitoso producirá un mensaje en la terminal indicando la autenticación correcta con PostgreSQL y confirmando que la REST API se encuentra escuchando en el puerto 4000 local.
