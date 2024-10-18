import { redirect } from '@sveltejs/kit';
import db from '$lib/db/drizzle.js';
import { landlordsTable, usersTable } from '$lib/db/schema.js';
import { eq } from 'drizzle-orm';
import R from '$lib/utils/remember_me.js';
import { ROUTES } from '$lib/constants/routes';

export const load = async ({ cookies, url }) => {
	const cookieInfo = R(cookies);

	if (!cookieInfo) {
		cookies.delete('remember_me');
		throw redirect(303, ROUTES.login);
	}

	const [user] = await db
		.select({
			id: usersTable.id,
			firstName: usersTable.firstName,
			lastName: usersTable.lastName,
			email: usersTable.email,
			loginToken: usersTable.loginToken
		})
		.from(usersTable)
		.where(eq(usersTable.email, cookieInfo.email));

	if (!user) {
		cookies.delete('remember_me');
		throw redirect(303, ROUTES.login);
	}

	if (user.loginToken !== cookieInfo.loginToken) {
		cookies.delete('remember_me');
		throw redirect(303, ROUTES.login);
	}

	const landlords = await db.select().from(landlordsTable);
	let needCreateLandlords = false;

	if (!landlords.length) {
		needCreateLandlords = true;
	}

	if (!landlords.length && ROUTES.createLandlords !== url.pathname) {
		throw redirect(303, ROUTES.createLandlords);
	}

	return { ...user, needCreateLandlords };
};
