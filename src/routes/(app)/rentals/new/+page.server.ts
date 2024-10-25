import FormDataToJson from "$lib/utils/FormDataToJson.js";
import db from "$lib/db/drizzle";
import { propertiesTable, rentalsTable, tenantsTable } from "$lib/db/schema.js";
import dayjs from "dayjs";
import { desc, eq, isNotNull, isNull, or } from "drizzle-orm";

export const load = async ({ parent }) => {
  await parent();
  const propertiesOptions = (
    await db
      .selectDistinct()
      .from(propertiesTable)
      .leftJoin(rentalsTable, eq(propertiesTable.id, rentalsTable.property_id))
      .orderBy(desc(rentalsTable.id))
      .limit(1)
      .where(or(isNull(rentalsTable.id), isNotNull(rentalsTable.endDate)))
  ).map((element) => ({
    label: element.properties.name,
    value: element.properties.id,
  }));

  const tenantsOptions = (
    await db
      .selectDistinct()
      .from(tenantsTable)
      .leftJoin(rentalsTable, eq(tenantsTable.id, rentalsTable.tenant_id))
      .orderBy(desc(rentalsTable.id))
      .limit(1)
      .where(or(isNull(rentalsTable.id), isNotNull(rentalsTable.endDate)))
  ).map((element) => ({
    label: element.tenants.name,
    value: element.tenants.id,
  }));

  return { propertiesOptions, tenantsOptions };
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { property, tenant, date } = FormDataToJson(data);
    if (property === "" || tenant === "" || date === "") {
      return {
        message: "Erreur dans les données",
        success: false,
      };
    }
    try {
      await db.insert(rentalsTable).values({
        property_id: +property,
        tenant_id: +tenant,
        startedAt: dayjs(date.toString()).toDate(),
      });
      return {
        message: "Location créé",
        success: true,
      };
    } catch {
      return {
        message: "Une erreur c'est produite lors de création de la location",
        success: false,
      };
    }
  },
};
