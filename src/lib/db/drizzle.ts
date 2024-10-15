import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';

import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } from '$env/static/private';

const connection = await mysql.createConnection({
	host: DB_HOST,
	port: Number(DB_PORT),
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE
});

const db = drizzle(connection);

// this will automatically run needed migrations on the database
await migrate(db, { migrationsFolder: './migrations' });

export default db;
