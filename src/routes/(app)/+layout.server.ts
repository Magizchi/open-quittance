import { redirect } from '@sveltejs/kit';
import db from '$lib/server/database.js';
import { landlordsTable, usersTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import CheckCookie from '$lib/utils/CheckCookie';
import { CheckSession } from '$lib/utils/Session.js';

export const load = async ({ cookies }) => {
    const cookieInfo = CheckCookie(cookies);

    if (!cookieInfo) {
        console.log('la.1');
        cookies.delete('remember_me');
        throw redirect(303, '/login');
    }

    const sessionInfo = CheckSession(cookies);
    if (!sessionInfo) {
        console.log('la.2');
        cookies.delete('remember_me');
        // throw redirect(303, '/login');
    }

    const [user] = (await db.select({
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
        loginToken: usersTable.loginToken,
    })
        .from(usersTable)
        .where(eq(usersTable.email, cookieInfo.email)));

    if (!user) {
        cookies.delete('remember_me');
        cookies.delete('session');
        throw redirect(303, '/login');
    }

    if (user.loginToken !== cookieInfo.loginToken) {
        cookies.delete('remember_me');
        cookies.delete('session');
        throw redirect(303, '/login');
    }

    const landlords = await db.select().from(landlordsTable);

    return { ...user, ...sessionInfo, landlords };
};