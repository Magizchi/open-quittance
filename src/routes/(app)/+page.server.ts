import { ROUTES } from "$lib/constants/routes";
import db from "$lib/db/drizzle";
import { landlordsTable, propertiesTable, usersTable, tenantsTable } from "$lib/db/schema";
import {
  generateNewReceipts,
  getReceipts,
  addPaymentDate,
} from "$lib/server/receipts";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import FormDataToJson from "$lib/utils/FormDataToJson.js";

export const load = async ({ locals, parent, url }) => {
  await parent();

  await generateNewReceipts();

  const page = url.searchParams.get("page")
    ? Number(url.searchParams.get("page"))
    : 1;
  const show = url.searchParams.get("show")
    ? Number(url.searchParams.get("show"))
    : 12;



  const receiptList = await getReceipts(page, show);
  let addLandlord: boolean = false;

  // Check user email
  const [user] = await db
    .select({
      id: usersTable.id,
      landlords: landlordsTable,
    })
    .from(usersTable)
    .leftJoin(landlordsTable, eq(usersTable.id, landlordsTable.user_id))
    .where(eq(usersTable.id, locals.user!.id));

  if (!user.landlords) {
    addLandlord = true;
  }


  return { receiptList, addLandlord };
};

export const actions = {
  create: async ({ request, locals }) => {
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
      user_id: locals.user!.id,
    });

    throw redirect(303, ROUTES.landing);
  },
  paymentDate: async ({ request }) => {
    return await addPaymentDate(request);
  },
  addAll: async ({ request, locals }) => {
    const data = await request.formData();
    const { property, tenant } = FormDataToJson(data);

    await db.insert(propertiesTable).values({
      name: '',
      landlord_id: locals.user!.id,
      address: property.address,
      postalCode: property.postalCode,
      city: property.city,
      rent: Number(property.rent),
      condo_fees: 0,
      taxes: 0
    });

    await db.insert(tenantsTable).values({
      name: tenant.name,
      siret: tenant.siret,
      address: tenant.address,
      city: tenant.city,
      postalCode: tenant.postalCode,
    });
  }
};
