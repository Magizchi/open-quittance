import db from "$lib/server/database.js";
import { organisationsTable } from "$lib/server/schema.js";
import { createNotification } from "$lib/stores/notification/store.js";
import CheckCookie from "$lib/utils/CheckCookie";
import FormatFormData from "$lib/utils/FormatFormData";
import { setSession } from "$lib/utils/Session.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    create: async ({ request, cookies }) => {
        const userInfo = CheckCookie(cookies);
        if (userInfo) {
            const data = await request.formData();

            const { landlord, error } = FormatFormData(data);

            if (error.status) return {
                success: false,
                status: 400,
                message: "Erreur-FormatFormData:" + error.message
            };

            const [addedOrganisation] = await db.insert(organisationsTable).values({ ...landlord, user_id: userInfo.id });
            // await setSession(userInfo.id, addedOrganisation.insertId, cookies);
            createNotification({ message: "oui", success: true }, 10000);
            throw redirect(303, '/');
        }
    }
};