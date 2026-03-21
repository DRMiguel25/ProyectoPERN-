import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Instancia de conexión a PostgreSQL mediante Sequelize ORM.
 *
 * Configuración:
 *  - La cadena de conexión se lee desde la variable de entorno DB_URL (.env).
 *  - dialectOptions.ssl habilita TLS/SSL requerido por Render (PostgreSQL en la nube).
 *  - logging desactivado en producción para evitar ruido en los logs del servidor.
 *  - models: detecta automáticamente todos los archivos *.ts dentro de /models.
 */
const db = new Sequelize(process.env.DB_URL!, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,          // Render exige conexión cifrada
            rejectUnauthorized: false
        }
    },
    logging: process.env.NODE_ENV !== 'production'
        ? console.log   // Muestra las queries SQL en desarrollo
        : false,        // Silenciado en producción
    models: [__dirname + '/../models/**/*.ts']
})

export default db