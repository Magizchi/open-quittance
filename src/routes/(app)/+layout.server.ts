import { ROUTES } from "$lib/constants/routes";
import db from "$lib/db/drizzle";
import { landlordsTable, usersTable } from "$lib/db/schema";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async ({ locals, url }) => {
  if (!locals.session) {
    throw redirect(303, ROUTES.login);
  }

  // Check user email
  const [user] = await db
    .select({
      id: usersTable.id,
      landlords: landlordsTable,
    })
    .from(usersTable)
    .leftJoin(landlordsTable, eq(usersTable.id, landlordsTable.user_id))
    .where(eq(usersTable.id, locals.user!.id));

  if (user && !user.landlords && ROUTES.createLandlords !== url.pathname) {
    throw redirect(303, ROUTES.createLandlords);
  }

  return { ...locals.user };
};
