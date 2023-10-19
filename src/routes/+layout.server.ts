import { migrate } from 'drizzle-orm/mysql2/migrator';
import db from '../lib/server/database'
import { redirect } from '@sveltejs/kit';



//MIGRATION > this will automatically run needed migrations on the database
await migrate(db, { migrationsFolder: './drizzle' });

