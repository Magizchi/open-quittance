import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { redirect } from "@sveltejs/kit";
import db from "$lib/db/drizzle";
import { tenantsTable } from "$lib/db/schema.js";
import { ROUTES } from "$lib/constants/routes.js";

export const load = async ({ parent }) => {
  await parent();
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { name, address, city, postalCode } = FormDataToJson(data);
    if (name === "" || address === "" || city === "" || postalCode === "") {
      return {
        success: false,
        message: "Erreur dans les données",
      };
    }
    try {
      await db.insert(tenantsTable).values({
        name,
        address,
        city,
        postalCode,
      });
      return {
        success: true,
        message: "Locataire créé",
      };
    } catch (err) {
      return {
        message: "Erreur c'est produite à la création du locataire",
        success: false,
      };
    }

    throw redirect(303, ROUTES.tenants);
  },
};
