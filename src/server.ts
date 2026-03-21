import express from 'express';
import router from './router';
import db from './config/db';

// ─── Conexion a la base de datos ─────────────────────────────────────────────
async function connectDB() {
    try {
        await db.authenticate();
        // Sincronizacion normal, segura para produccion
        await db.sync();
        console.log('Conexion a PostgreSQL exitosa');
    } catch (error) {
        console.error('Error de conexion:', error);
    }
}

connectDB();

// ─── Configuracion del servidor Express ──────────────────────────────────────
const server = express();

// CORS — permite peticiones desde el servidor de desarrollo de Vite (React)
//  • En desarrollo: http://localhost:5173
//  • En produccion: ajusta este valor a la URL real del frontend desplegado
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Las peticiones OPTIONS son "preflight" enviadas por el navegador antes
    // de cualquier request con metodo no simple (PUT, DELETE, PATCH, etc.).
    // Hay que responderlas con 200 para que el navegador continue.
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Body parser — habilita req.body en formato JSON
server.use(express.json());

// ─── Rutas ───────────────────────────────────────────────────────────────────
server.use('/Api/products', router);

export default server;