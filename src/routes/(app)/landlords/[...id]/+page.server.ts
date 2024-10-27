import { ROUTES } from "$lib/constants/routes.js";
import db from "$lib/db/drizzle.js";
import { landlordsTable } from "$lib/db/schema";
import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { fail, redirect } from "@sveltejs/kit";
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

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { postalCode, address, city, landlordName } = FormDataToJson(data);

    if (
      address === "" ||
      postalCode === "" ||
      city === "" ||
      landlordName === ""
    ) {
      return fail(403, {
        message: "Erreur dans les données",
        success: false,
      });
    }

    await db.update(landlordsTable).set({
      address,
      postalCode,
      city,
      name: landlordName,
    });

    throw redirect(303, ROUTES.landing);
  },
};
