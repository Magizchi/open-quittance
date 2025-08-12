import { ROUTES } from "$lib/constants/routes";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (!locals.session) {
    throw redirect(303, ROUTES.login);
  }

  return { ...locals.user };
};
