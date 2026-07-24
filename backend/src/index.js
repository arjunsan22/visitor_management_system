import dotenv from 'dotenv'
dotenv.config();

import app from './app.js'
import pool from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Mysql connected');
        connection.release();
        app.listen(PORT,()=>{
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Database connection failed');
        console.error(error.message);
        process.exit(1);
        
    }
}
startServer();