import type { Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_SESSION } from '$env/static/private';

interface Session {
    landlordId: number;
    landlordName: string;
}

export const CheckSession = (cookies: Cookies) => {
    const sessionJwt = cookies.get('session');
    if (!sessionJwt) {
        return undefined;
    }

    const sessionInfo = jwt.verify(sessionJwt, JWT_SECRET_SESSION) as Session;
    return sessionInfo;
};

export const setSession = (sessionInfo: Session, cookies: Cookies) => {

    const sessionJwt = jwt.sign({
        ...sessionInfo
    }, JWT_SECRET_SESSION);

    cookies.set('session', sessionJwt, { httpOnly: true, sameSite: "strict", path: "/" });

};

export const getSession = (cookies: Cookies) => {
    const session = cookies.get("session");
    if (!session) {
        return undefined;
    }
    const sessionUser = jwt.verify(session, JWT_SECRET_SESSION) as { landlordId: number; };
    return sessionUser;
};
