import { ROUTES } from "$lib/constants/routes.js";
import db from "$lib/db/drizzle.js";
import { landlordsTable } from "$lib/db/schema";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async ({ parent, params }) => {
  await parent();

  const [landlord] = await db
    .select()
    .from(landlordsTable)
    .where(eq(landlordsTable.id, +params.id));

  if (!landlord) {
    throw redirect(303, ROUTES.settings);
  }

  return { landlord };
};
