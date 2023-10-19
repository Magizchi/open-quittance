import bcrypt from "bcrypt";
import { redirect, fail } from '@sveltejs/kit';
import db from "$lib/server/database";
import { ownersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '$env/static/private';

//JWT
export const load = ({ cookies }) => {
    const cookiesJwt = cookies.get('auth')
    if (cookiesJwt) {
        throw redirect(303, "/")
    }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const login = data.get('username') || "";
        const password = data.get('password') || "";

        if (!login || !password) {
            return fail(403, {
                incorrect: true
            });
        }
        const [user] = await db.select({
            id: ownersTable.id,
            email: ownersTable.email,
            hash: ownersTable.password
        })
            .from(ownersTable)
            .where(eq(ownersTable.email, login.toString())) as { id: number; email: string; hash: string }[]

        if (!user) {
            return fail(404, {
                message: "Utilisateur n'existe pas",
                incorrect: true
            });
        }
        const { hash, ...userInfo } = user
        const authenticated = await bcrypt.compare(password.toString(), hash);

        if (!authenticated) {
            return fail(401, {
                message: "non autorisé",
                incorrect: true
            })
        }
        const jsonwt = jwt.sign({ authToke: userInfo }, JWT_SECRET_TOKEN)
        cookies.set('auth', jsonwt, { httpOnly: true, maxAge: 60 * 60 * 24, sameSite: "strict" })

        throw redirect(303, "/")
    }
};