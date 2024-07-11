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

export const createTables = async () => {
    const client = await pool.connect();

    //     .then(() => {
    //     console.log("--> Connected to Postgres database");
    // }).catch((err) => {
    //     console.log("--> Error connecting to PostgreSQL database", err);
    // });

    try {
        await client.query(`BEGIN`);

        // Check if the "users" table exists
        const userTableExists = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            );
            `);

        if (!userTableExists.rows[0].exists) {
            await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(100),
                    password VARCHAR(100),
                    first_name VARCHAR(100),
                    last_name VARCHAR(100),
                    bio VARCHAR(500),
                    cocktails_created VARCHAR(255)[],
                    cocktail_saved VARCHAR(255)[]
                );
            `);
            console.log("Created 'users' table");
        }

        // Check if the "cocktails" table exists
        const postTableExists = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'cocktails'
            );
            `);

        if (!postTableExists.rows[0].exists) {
            await client.query(`
                CREATE TABLE cocktails (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    created_by VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    category VARCHAR(100),
                    ingredients VARCHAR(255)[],
                    instructions VARCHAR(255)[],
                    image_name VARCHAR(500),
                    image_url VARCHAR(500)
                );
            `);
            console.log("Created 'cocktails' table");
        }

        await client.query(`COMMIT`);
    } catch (error) {
        await client.query(`ROLLBACK`);
        console.error("Error setting up database:", error);
    } finally {
        client.release();
    }
}