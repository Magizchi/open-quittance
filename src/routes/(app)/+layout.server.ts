import { ROUTES } from "$lib/constants/routes";
import db from "$lib/db/drizzle.js";
import { landlordsTable } from "$lib/db/schema.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ url, locals }) => {
  if (!locals.session) {
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

  return { ...locals.user, needCreateLandlords };
};
