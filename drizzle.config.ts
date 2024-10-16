import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/db/schema.ts',
	out: './migrations',
	dialect: 'mysql',
	dbCredentials: {
		host: process.env.DB_HOST!,
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE!
	}
} satisfies Config;
