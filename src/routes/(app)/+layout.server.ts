import { redirect } from '@sveltejs/kit';

//JWT
export const load = ({ cookies }) => {
    const cookiesJwt = cookies.get('auth')
    if (!cookiesJwt) {
        throw redirect(303, "/login")
    }
}

