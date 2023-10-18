import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const db = drizzle(connection);

// this will automatically run needed migrations on the database
await migrate(db, { migrationsFolder: './drizzle' });

export default db;