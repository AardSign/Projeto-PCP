import 'dotenv/config';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

// Configuração do pool de conexões
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '9127',
    database: 'PCP_data',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Sequelize instance
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

export { pool }; // Export pool as a named export
export default db; // Default export for db
