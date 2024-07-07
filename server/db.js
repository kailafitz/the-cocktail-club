import pg from "pg";
const { Pool } = pg;
import * as dotenv from "dotenv";

dotenv.config();

export const pool = new Pool(process.env.NODE_ENV === "development" ? {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
} : {
    connectionString: process.env.DB_CONNECTION,
    ssl: {
        rejectUnauthorized: false
    }
});

if (process.env.NODE_ENV === "development") {
    pool
        .connect()
        .then(() => {
            console.log("--> Connected to Postgres database");
        })
        .catch((err) => {
            console.log("--> Error connecting to PostgreSQL database", err);
        });
}

// if (!(pool.query("SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename = 'users')"))) {
//     pool.query("CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(100), password VARCHAR(100), firstname VARCHAR(100), lastname VARCHAR(100), bio VARCHAR(500));")
// }

// db.query('SELECT * FROM employees', (err, result) => {
//     if (err) {
//         console.error('Error executing query', err);
//     } else {
//         console.log('Query result:', result.rows);
//     }

//     // Close the connection when done
//     db
//         .end()
//         .then(() => {
//             console.log('Connection to PostgreSQL closed');
//         })
//         .catch((err) => {
//             console.error('Error closing connection', err);
//         });
// });