import bcrypt from "bcrypt";
import { redirect, fail } from '@sveltejs/kit';
import db from "$lib/server/database";
import { usersTable } from "$lib/server/schema";
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
                message: "Donnée incorrect",
                incorrect: true
            });
        }

        const [user] = await db.select({
            id: usersTable.id,
            email: usersTable.email,
            hash: usersTable.password
        })
            .from(usersTable)
            .where(eq(usersTable.email, login.toString())) as { id: number; email: string; hash: string }[]
        if (!user) {
            return fail(404, {
                message: "Identifiant ou Mot de passe incorrect",
                incorrect: true
            });
        }
        const { hash, ...userInfo } = user
        const authenticated = await bcrypt.compare(password.toString(), hash);

        if (!authenticated) {
            return fail(401, {
                message: "Identifiant ou Mot de passe incorrect",
                incorrect: true
            })
        }
        const uuid = await bcrypt.genSalt()
        await db.update(usersTable)
            .set({ loginToken: uuid })
            .where(eq(usersTable.email, login.toString()));
        const jsonwt = jwt.sign({ ...userInfo, loginToken: uuid }, JWT_SECRET_TOKEN)
        cookies.set('auth', jsonwt, { httpOnly: true, maxAge: 60 * 60 * 24, sameSite: "strict" })

        throw redirect(303, "/")
    }
};