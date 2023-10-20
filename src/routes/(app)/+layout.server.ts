import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '$env/static/private';
import db from '$lib/server/database.js';
import { ownersTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';

//JWT
export const load = async ({ cookies }) => {
    const cookiesJwt = cookies.get('auth')
    if (!cookiesJwt) {
        throw redirect(303, "/login")
    }

    const decoded = jwt.verify(cookiesJwt, JWT_SECRET_TOKEN) as any;

    const [user] = await db.select().from(ownersTable).where(eq(ownersTable.email, decoded.authToke.email))
    if (!user) {
        throw redirect(303, '/')
    }

    if (user.loginToken !== decoded.authToke.loginToken) {
        throw redirect(303, '/')
    }
    return { email: user.email, name: user.name, id: user.id }
}

