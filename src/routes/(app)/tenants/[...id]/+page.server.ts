import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { redirect } from "@sveltejs/kit";
import db from "$lib/db/drizzle";
import { tenantsTable } from "$lib/db/schema.js";
import { eq } from "drizzle-orm";
import { ROUTES } from "$lib/constants/routes";

export const load = async ({ parent, params }) => {
  await parent();

  const [tenant] = await db
    .select()
    .from(tenantsTable)
    .where(eq(tenantsTable.id, +params.id));
  if (!tenant) {
    throw redirect(303, ROUTES.tenants);
  }
  return { tenant };
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { id, name, address, city, postalCode } = FormDataToJson(data);
    if (
      id === "" ||
      name === "" ||
      address === "" ||
      city === "" ||
      postalCode === ""
    ) {
      return {
        message: "Tous les champs ne sont pas respecté",
        success: false,
      };
    }
    try {
      await db
        .update(tenantsTable)
        .set({
          name,
          address,
          city,
          postalCode,
        })
        .where(eq(tenantsTable.id, +id));
      return {
        message: "Locataire modifié",
        success: true,
      };
    } catch (err) {
      return {
        message: "Une erreur c'est produite",
        success: false,
      };
    }
  },
};
