import { redirect, type Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '$env/static/private';

interface UserToken {
    id: number;
    email: string;
    loginToken: string
}
const CheckToken = (cookies: Cookies) => {
    const cookiesJwt = cookies.get('auth')
    if (!cookiesJwt) {
        throw redirect(303, "/login")
    }
    const userInfo = jwt.verify(cookiesJwt, JWT_SECRET_TOKEN) as UserToken;

    return { ...userInfo, token: cookiesJwt }
}

export default CheckToken