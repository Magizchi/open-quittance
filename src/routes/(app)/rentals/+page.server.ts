import db from "$lib/db/drizzle";
import {
  landlordsTable,
  propertiesTable,
  rentalsTable,
  tenantsTable,
} from "$lib/db/schema";
import dayjs from "dayjs";
import { eq, isNull } from "drizzle-orm";

export const load = async () => {
  const rentals = await db
    .select()
    .from(rentalsTable)
    .innerJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
    .innerJoin(
      propertiesTable,
      eq(rentalsTable.property_id, propertiesTable.id)
    )
    .innerJoin(
      landlordsTable,
      eq(propertiesTable.landlord_id, landlordsTable.id)
    )
    .where(isNull(rentalsTable.endDate));

  const propertiesOptions = (
    await db
      .select({
        propertyId: propertiesTable.id,
        name: propertiesTable.name,
        city: propertiesTable.city,
      })
      .from(propertiesTable)
  ).map((item) => ({
    value: item.propertyId,
    label: `${item.name}:${item.city}`,
  }));

  const tenantsOptions = (
    await db
      .select({
        name: tenantsTable.name,
        id: tenantsTable.id,
      })
      .from(tenantsTable)
  ).map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return { rentals, propertiesOptions, tenantsOptions };
};

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    if (data.get("endDate") === "" || data.get("rentalId") === "") {
      return {
        message: "Erreur dans les données",
        success: false,
      };
    }
    try {
      await db
        .update(rentalsTable)
        .set({ endDate: dayjs(data.get("endDate")!.toString()).toDate() })
        .where(eq(rentalsTable.id, +data.get("rentalId")!.toString()));
      return {
        message: "Fin de location",
        success: true,
      };
    } catch {
      return {
        message: "Une Erreur c'est produite",
        success: false,
      };
    }
  },
};
