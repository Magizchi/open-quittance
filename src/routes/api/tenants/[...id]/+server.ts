import db from "$lib/db/drizzle.js";
import { tenantsTable } from "$lib/db/schema.js";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function DELETE({ params }) {
  try {
    await db.delete(tenantsTable).where(eq(tenantsTable.id, +params.id));
    const response = await db.select().from(tenantsTable);
    return json(
      { message: "Locataire supprimer", success: true, data: response },
      { status: 201 }
    );
  } catch (err) {
    return json(
      { message: "Locataire supprimer", success: false, data: [] },
      { status: 400 }
    );
  }
}
