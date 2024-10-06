import { redirect } from '@sveltejs/kit';
import db from '$lib/server/database.js';
import { landlordsTable, usersTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import CheckCookie from '$lib/utils/CheckCookie';
import { Routes } from '$lib/constants/routes';

export const load = async ({ cookies, url }) => {
    const cookieInfo = CheckCookie(cookies);

    if (!cookieInfo) {
        cookies.delete('remember_me');
        throw redirect(303, Routes.login);
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
        throw redirect(303, Routes.login);
    }

    if (user.loginToken !== cookieInfo.loginToken) {
        cookies.delete('remember_me');
        throw redirect(303, Routes.login);
    }

    const landlords = await db.select().from(landlordsTable);
    let needCreateLandlords = false;

    if (!landlords.length) {
        needCreateLandlords = true;
    }

    if (!landlords.length && Routes.createLandlords !== url.pathname) {
        throw redirect(303, Routes.createLandlords);
    }

    return { ...user, needCreateLandlords };
};
