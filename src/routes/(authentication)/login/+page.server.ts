import bcrypt from "bcrypt";
import { redirect, fail } from '@sveltejs/kit';
import db from "$lib/server/database";
import { usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { createCookie } from "$lib/utils/remember_me.js";

export const load = ({ cookies }) => {
    const cookiesJwt = cookies.get('remember_me');
    if (cookiesJwt) {
        throw redirect(303, "/");
    }
};

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

        // Check user email
        const [user] = await db.select({
            id: usersTable.id,
            email: usersTable.email,
            hash: usersTable.password
        })
            .from(usersTable)
            .where(eq(usersTable.email, login.toString())) as { id: number; email: string; hash: string; }[];

        if (!user) {
            return fail(404, {
                message: "Identifiant ou Mot de passe incorrect",
                incorrect: true
            });
        }
        // Check password
        const { hash, ...userInfo } = user;
        const authenticated = await bcrypt.compare(password.toString(), hash);

        if (!authenticated) {
            return fail(401, {
                message: "Identifiant ou Mot de passe incorrect",
                incorrect: true
            });
        }

        // Add Cookie "remember_me"
        await createCookie(userInfo, cookies);

        throw redirect(303, "/");
    }
};