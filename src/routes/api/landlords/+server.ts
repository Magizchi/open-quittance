import db from '$lib/server/database.js';
import { landlordsTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { setSession } from '$lib/utils/Session.js';

export async function GET({ url, cookies }) {
    try {
        const landlordId = url.searchParams.get('landlordId');
        if (!landlordId) {
            return new Response(null, { status: 404 });
        }
        const [landlord] = await db.select().from(landlordsTable).where(eq(
            landlordsTable.id, +landlordId
        ));

        setSession({ landlordId: landlord.id, landlordName: landlord.name }, cookies);

        return new Response(JSON.stringify(landlord), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(null, { status: 404 });
    }
}