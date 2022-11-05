import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './src/routes/index.js';
import { conn } from './src/services/index.js';
import { handleServerError } from './src/middlewares/serverError.middleware.js';

//import { ruta, pepito, sdasda } from './routes';

dotenv.config()

// Crear el servidor/aplicacion de express
const app = express();
const PORT = 3000;
const CURRENT_VERSION = '/v1';

app.use( handleServerError );
// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( CURRENT_VERSION, routes );

conn.connectToServer(start);

function start() {
    app.listen( PORT, () => {
        console.log(`Server running on port ${ PORT }`);
    });
}