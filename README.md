# ProyectoPern - REST API con Express y Sequelize

Proyecto de practica para la materia **Sistemas Abiertos II** (Segundo Parcial), desarrollado por **Miguel Angel Diaz Rivera**. Este proyecto implementa una REST API utilizando el stack **PERN** (PostgreSQL, Express, React, Node.js) y cubre los siguientes temas del curso.

---

## Temas Vistos en el Proyecto

### 1. ORMs (Object-Relational Mapping)

Se utiliza **Sequelize** como ORM para mapear objetos de TypeScript a tablas de PostgreSQL, eliminando la necesidad de escribir consultas SQL manualmente.

- **sequelize-typescript**: Extension de Sequelize que permite definir modelos usando decoradores de TypeScript (`@Table`, `@Column`, `@Model`, `@Default`, `@PrimaryKey`, `@AutoIncrement`).
- Sincronizacion automatica de modelos con la base de datos mediante `db.sync()`.
- Creacion de registros con `Model.create()`.

**Archivo de referencia:** `server/src/models/Product.model.ts`

---

### 2. Sequelize - Data Types

Se aplican multiples tipos de datos de Sequelize para definir las columnas del modelo `Product`:

| Tipo de Dato        | Uso en el Proyecto                  | Columna        |
|---------------------|--------------------------------------|----------------|
| `DataType.INTEGER`  | Identificador unico (Primary Key)    | `id`           |
| `DataType.STRING`   | Nombre del producto (max 100 chars)  | `name`         |
| `DataType.FLOAT`    | Precio con decimales                 | `price`        |
| `DataType.INTEGER`  | Cantidad en inventario               | `quantity`     |
| `DataType.BOOLEAN`  | Disponibilidad del producto          | `availability` |

Ademas se utilizan restricciones como `allowNull`, `unique` y `Default`.

**Archivo de referencia:** `server/src/models/Product.model.ts`

---

### 3. Metodos de Transferencia de Estado (Express.js)

Se implementan los **5 metodos HTTP** principales de una API REST:

| Metodo   | Ruta   | Descripcion                             |
|----------|--------|-----------------------------------------|
| `GET`    | `/Api` | Obtener datos (respuesta JSON)          |
| `POST`   | `/Api` | Crear un nuevo producto                 |
| `PUT`    | `/Api` | Actualizar un recurso completo          |
| `PATCH`  | `/Api` | Actualizar parcialmente un recurso      |
| `DELETE` | `/Api` | Eliminar un recurso                     |

Esto demuestra los distintos verbos HTTP para la transferencia de estado representacional (REST).

**Archivo de referencia:** `server/src/router.ts`

---

### 4. Render (Despliegue de Base de Datos en la Nube)

Se utiliza **Render** como servicio en la nube para alojar la base de datos **PostgreSQL**. La conexion se realiza mediante una URL proporcionada por Render, almacenada como variable de entorno.

- Servidor de base de datos en: `oregon-postgres.render.com`
- Conexion con soporte SSL (`?ssl=true`)
- Base de datos: `metodos_db`

**Archivo de referencia:** `server/.env`

---

### 5. Middleware en Express.js

Se implementa un **middleware personalizado** para el manejo centralizado de errores de validacion:

- El middleware `handleInputErrors` intercepta las solicitudes antes de llegar al controlador final.
- Utiliza `validationResult` de **express-validator** para verificar errores.
- Responde con status `400` si hay errores, o llama a `next()` para continuar el flujo.

El flujo del request sigue el patron: **Validaciones -> Middleware de Errores -> Handler Final**.

**Archivo de referencia:** `server/src/middleware/index.ts`

---

### 6. Validacion de Datos con express-validator

Se utiliza la libreria **express-validator** para validar los datos de entrada en las rutas:

- `body('name').notEmpty()` — Valida que el nombre no este vacio.
- `body('price').isNumeric()` — Valida que el precio sea numerico.
- `.custom(value => value > 0)` — Validacion personalizada para rechazar precios negativos.

Las validaciones se definen directamente en el router como cadenas de middleware.

**Archivo de referencia:** `server/src/router.ts`

---

### 7. Variables de Entorno con dotenv

Se utiliza el paquete **dotenv** para gestionar variables de entorno de forma segura:

- Carga automatica de variables desde el archivo `.env` con `dotenv.config()`.
- La URL de la base de datos (`DB_URL`) se almacena como variable de entorno.
- Se evita exponer credenciales sensibles directamente en el codigo fuente.

**Archivo de referencia:** `server/src/config/db.ts`

---

### 8. TypeScript (Tipado Estatico)

El proyecto esta escrito completamente en **TypeScript**:

- Tipado de parametros con `Request`, `Response` y `NextFunction` de Express.
- Decoradores experimentales habilitados (`experimentalDecorators`, `emitDecoratorMetadata`).
- Compilacion con `ts-node` para desarrollo y transpilacion a JavaScript en `dist/`.

**Archivo de referencia:** `server/tsconfig.json`

---

### 9. Arquitectura del Proyecto

El proyecto sigue una **arquitectura por capas** organizada de la siguiente manera:

```
server/
├── src/
│   ├── config/
│   │   └── db.ts              # Configuracion de la base de datos (Sequelize)
│   ├── handlers/
│   │   └── product.ts         # Controladores / Handlers de productos
│   ├── middleware/
│   │   └── index.ts           # Middleware de validacion de errores
│   ├── models/
│   │   └── Product.model.ts   # Modelo de datos con decoradores
│   ├── index.ts               # Punto de entrada de la aplicacion
│   ├── router.ts              # Definicion de rutas y validaciones
│   └── server.ts              # Configuracion de Express y conexion a DB
├── .env                       # Variables de entorno
├── package.json               # Dependencias y scripts
└── tsconfig.json              # Configuracion de TypeScript
```

---

## Tecnologias Utilizadas

| Tecnologia              | Version   | Proposito                                |
|--------------------------|-----------|------------------------------------------|
| Node.js                  | —         | Entorno de ejecucion                     |
| Express                  | 5.2.1     | Framework web para la API REST           |
| Sequelize                | 6.37.7    | ORM para PostgreSQL                      |
| sequelize-typescript     | 2.1.6     | Decoradores TypeScript para Sequelize    |
| PostgreSQL               | —         | Base de datos relacional                 |
| TypeScript               | 5.9.3     | Lenguaje con tipado estatico             |
| express-validator        | 7.3.1     | Validacion de datos de entrada           |
| dotenv                   | 17.3.1    | Gestion de variables de entorno          |
| Render                   | —         | Hosting de la base de datos en la nube   |
| nodemon                  | 3.1.13    | Recarga automatica durante desarrollo    |

---

## Como Ejecutar el Proyecto

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ProyectoPern/server
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la carpeta `server/` con la siguiente variable:
   ```
   DB_URL=postgresql://<usuario>:<password>@<host>/<database>?ssl=true
   ```

4. **Iniciar el servidor en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **El servidor estara disponible en:** `http://localhost:4000/Api`
