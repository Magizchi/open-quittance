import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import db from '$lib/db/drizzle';
import { usersTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '$env/static/private';

interface UserInfo {
	id: number;
	email: string;
}
export const createCookie = async (user: UserInfo, cookies: Cookies) => {
	const uuid = await bcrypt.genSalt();

	try {
		await db
			.update(usersTable)
			.set({ loginToken: uuid })
			.where(eq(usersTable.email, user.email.toString()));
	} catch (err) {
		return fail(401, {
			message: 'Erreur lors de la connexion',
			incorrect: true
		});
	}

	const jsonwt = jwt.sign({ ...user, loginToken: uuid }, JWT_SECRET_TOKEN);

	cookies.set('remember_me', jsonwt, {
		httpOnly: true,
		maxAge: 60 * 60 * 24,
		sameSite: 'strict',
		path: '/'
	});
};


interface UserToken {
	id: number;
	email: string;
	loginToken: string;
	landlordId?: string | number;
	landlordName?: string;
}

const checkCookie = (cookies: Cookies) => {
	const cookiesJwt = cookies.get('remember_me');
	if (!cookiesJwt) {
		return undefined;
	}
	try {
		const userInfo = jwt.verify(cookiesJwt, JWT_SECRET_TOKEN) as UserToken;
		return { ...userInfo, token: cookiesJwt };
	} catch (err) {
		return undefined;
	}
};

export default checkCookie;