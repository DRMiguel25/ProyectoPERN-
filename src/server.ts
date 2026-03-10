import express from 'express';
import router from './router';
import db from './config/db';

async function connectDB() {
    try {
        await db.authenticate(); 
        await db.sync(); 
        console.log(" Conexión exitosa");
    } catch (error) {
        console.log(" Error de conexión:", error);
    }
}

connectDB();

const server = express();

server.use(express.json())
server.use('/Api', router);

export default server;