import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { redirect } from "@sveltejs/kit";
import db from "$lib/server/database";
import { propertiesTable } from "$lib/server/schema.js";

export const load = async ({ parent }) => {
    await parent();
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const { name, address, city, rent, condo_fees, taxes, postalCode } = FormDataToJson(data);

        try {
            await db.insert(propertiesTable).values({
                landlord_id: 3,
                name,
                address,
                city,
                rent: +rent,
                condo_fees: +condo_fees,
                taxes: +taxes,
                postalCode,
            });
        } catch (err) {
            return {
                message: 'eerr' + err,
                success: false,
                status: 400
            };
        }

        throw redirect(303, "/");
    }
};