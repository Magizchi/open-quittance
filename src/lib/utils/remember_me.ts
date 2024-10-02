import bcrypt from "bcrypt";
import { Cookies } from '@sveltejs/kit';
import db from "$lib/server/database";
import { usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '$env/static/private';

interface UserInfo {
    id: number;
    email: string;
}
export const createCookie = async (user: UserInfo, cookies: Cookies) => {
    const uuid = await bcrypt.genSalt();

    // Update loginToken in bdd
    await db.update(usersTable)
        .set({ loginToken: uuid })
        .where(eq(usersTable.email, user.email.toString()));

    const jsonwt = jwt.sign({ ...user, loginToken: uuid }, JWT_SECRET_TOKEN);
    cookies.set('remember_me', jsonwt, { httpOnly: true, maxAge: 60 * 60 * 24, sameSite: "strict", path: "/" });
};