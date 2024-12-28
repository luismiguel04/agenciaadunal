const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Prospectos = require('./routes/Prospectos');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/uploads', express.static('uploads')); // Servir imágenes
app.use('/api', Prospectos); //

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
