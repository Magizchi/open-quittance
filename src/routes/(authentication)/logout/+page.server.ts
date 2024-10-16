import { Routes } from '$lib/constants/routes.js';
import { redirect } from '@sveltejs/kit';



export const load = ({ cookies }) => {

    cookies.delete('remember_me');
    throw redirect(303, Routes.login);
};