import db from "$lib/db/drizzle.js";
import { propertiesTable } from "$lib/db/schema.js";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function DELETE({ params }) {
  try {
    await db.delete(propertiesTable).where(eq(propertiesTable.id, +params.id));
    const response = await db.select().from(propertiesTable);
    return json(
      { message: "Propriété supprimer", success: true, data: response },
      { status: 201 }
    );
  } catch (err) {
    return json(
      { message: "Propriété supprimer", success: false, data: [] },
      { status: 400 }
    );
  }
}
