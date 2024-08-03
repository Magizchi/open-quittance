import bcrypt from "bcrypt";
import { redirect, fail } from '@sveltejs/kit';
import db from "$lib/server/database";
import { contractoresTable } from "$lib/server/schema";
import { eq, and, sql } from "drizzle-orm";

export async function load() { }

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const login = data.get('username') || "";
        const password = data.get('password') || "";

        // if (!login || !password) {
        //     return fail(403, {
        //         incorrect: true
        //     });
        // }
        // const user = db.select().from(ownersTable).where(eq(ownersTable, login))
        // console.log('user', user)
        const salt = await bcrypt.genSalt(10);
        console.log('salt', salt);
        const hash = await bcrypt.hash(password.toString(), salt);
        console.log('hash', hash);


    }
};


