import { ROUTES } from "$lib/constants/routes.js";
import { deleteSessionTokenCookie } from "$lib/utils/auth";
import { redirect } from "@sveltejs/kit";

export const load = (event) => {
  deleteSessionTokenCookie(event);
  throw redirect(303, ROUTES.login);
};
