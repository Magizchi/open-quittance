import { drizzle } from "drizzle-orm/mysql2";
import { DB_URL } from "$env/static/private";

const db = drizzle(DB_URL);
export default db;
