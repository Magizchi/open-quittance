import { config } from 'dotenv';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Résoudre le chemin absolu du fichier .env à la racine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, '../.env') });

// Init drizzle
const db = drizzle(process.env.DB_URL);
try {
    await db.execute(sql`INSERT INTO users (id, firstName, lastName, email, password, loginToken)
    VALUES (1, '', '', 'admin@gmail.com', '$2b$10$.vAQ4ipd3dh1da3gjZ/w7e9Y23mEOz2rqMzPOC3SfJkCfAIkY/Qpy', NULL);`)
} catch (err) {
    console.log('err', err)
}

console.log('Insertion réussie !');
process.exit(0);