import { redirect } from '@sveltejs/kit';
import db from '$lib/server/database.js';
import { usersTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import CheckToken from '$lib/utils/CheckToken'

export const load = async ({ cookies }) => {
    const userInfo = CheckToken(cookies)

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, userInfo.email))
    if (!user) {
        throw redirect(303, '/')
    }

    if (user.loginToken !== userInfo.loginToken) {
        throw redirect(303, '/')
    }
    return { email: user.email, name: user.firstName, id: user.id }
}

