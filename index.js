import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';

//import { ruta, pepito, sdasda } from './routes';

// Crear el servidor/aplicacion de express
const app = express();

const PORT = 3000;

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( routes );

app.listen( PORT, () => {
    console.log(`Servidor corriendo en puerto ${ PORT }`);
});