import FormDataToJson from "$lib/utils/FormDataToJson.js";
import db from "$lib/db/drizzle";
import { propertiesTable } from "$lib/db/schema.js";

export const load = async ({ parent }) => {
  await parent();
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { name, address, city, rent, condo_fees, taxes, postalCode } =
      FormDataToJson(data);

    try {
      await db.insert(propertiesTable).values({
        landlord_id: 1,
        name,
        address,
        city,
        rent: +rent,
        condo_fees: +condo_fees,
        taxes: +taxes,
        postalCode,
      });
      return {
        message: "Propriété créé",
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
