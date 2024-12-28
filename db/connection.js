const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Puerto por defecto de PostgreSQL
});

pool.on('connect', () => {
    console.log('Conexión establecida con PostgreSQL');
});

module.exports = pool;

