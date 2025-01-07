import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
} from "$env/static/private";

const connection = await mysql.createConnection({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  keepAliveInitialDelay: 10000, // 0 by default.
  enableKeepAlive: true,
  waitForConnections: true,
  maxIdle: 0,
  idleTimeout: 60000,
});

//Instantiate the connection
await connection.connect();

const db = drizzle(connection);

export default db;
