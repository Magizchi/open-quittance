import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { fail, redirect } from "@sveltejs/kit";
import db from "$lib/db/drizzle";
import { landlordsTable } from "$lib/db/schema.js";
import { eq } from "drizzle-orm";
import { ROUTES } from "$lib/constants/routes.js";

export const load = async ({ parent }) => {
  const user = await parent();
  return { user };
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { postalCode, address, city, landlordName } = FormDataToJson(data);

    const [landlord] = await db
      .select()
      .from(landlordsTable)
      .where(eq(landlordsTable.name, landlordName));

    if (landlord) {
      return fail(403, {
        message: "Ce bailleur existe déjà",
        incorrect: true,
      });
    }

    await db.insert(landlordsTable).values({
      address,
      postalCode,
      city,
      name: landlordName,
    });

    throw redirect(303, ROUTES.landing);
  },
};
