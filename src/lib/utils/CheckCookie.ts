import type { Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '$env/static/private';

interface UserToken {
    id: number;
    email: string;
    loginToken: string;
    landlordId?: string | number;
    landlordName?: string;
}
const CheckCookie = (cookies: Cookies) => {
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

export default CheckCookie;