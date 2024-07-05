import pg from "pg";
const { Pool } = pg;
import * as dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
})

if (process.env.NODE_ENV === "development") {
    pool
        .connect()
        .then(() => {
            console.log("----> Connected to Postgres database");
        })
        .catch((err) => {
            console.error("----> Error connecting to PostgreSQL database", err);
        });
}

// if (!(pool.query("SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename = 'users')"))) {
//     pool.query("CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(100), password VARCHAR(100), firstName VARCHAR(100), lastName VARCHAR(100), bio VARCHAR(500));")
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