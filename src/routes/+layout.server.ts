import { ROUTES } from "$lib/constants/routes";
import db from "$lib/db/drizzle";
import { usersTable } from "$lib/db/schema";
import { redirect } from "@sveltejs/kit";

export const load = async ({ url }) => {
  // Check any user
  const [userI]= await db
  .select()
  .from(usersTable)
  
  if (!userI && ROUTES.setup !== url.pathname)  {
    throw redirect(303, ROUTES.setup)
  }

  return
};