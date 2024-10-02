import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { fail, redirect } from "@sveltejs/kit";
import db from "$lib/server/database";
import { landlordsTable } from "$lib/server/schema.js";
import { eq } from "drizzle-orm";
import { createNotification } from "$lib/stores/notification/store.js";
import { setSession } from "$lib/utils/Session.js";

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const { postalCode, address, city, landlordName } = FormDataToJson(data);

        const [landlord] = await db.select().from(landlordsTable).where(eq(landlordsTable.name, landlordName));

        if (landlord) {
            createNotification({ message: "Ce bailleur existe déjà", success: false });
            return fail(403, {
                message: "Ce bailleur existe déjà",
                incorrect: true
            });
        }

        const [addedLandlord] = await db.insert(landlordsTable).values({
            address,
            postalCode,
            city,
            name: landlordName,
            user_id: 1
        });

        // Add cookie Session
        setSession({ landlordId: addedLandlord.insertId, landlordName }, cookies);

        throw redirect(303, "/");
    }
};