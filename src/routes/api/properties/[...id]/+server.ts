import db from '$lib/db/drizzle.js';
import { propertiesTable } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function DELETE({ params }) {
	try {
		console.log(params);
		await db.delete(propertiesTable).where(eq(propertiesTable.id, +params.id));
		return json({ message: 'Propriété supprimer', success: true }, { status: 201 });
	} catch (err) {
		return new Response(JSON.stringify(err), { status: 204 });
	}
}
