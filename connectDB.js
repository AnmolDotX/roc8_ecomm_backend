import mysql from 'mysql2/promise'

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env;


export async function connectDB() {
    const dbConfig = {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      };
      
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database as id ' + connection.threadId);
        return connection;
    } catch (err) {
        console.error('Error connecting to database: ' + err.message);
        throw err;
    }
}
