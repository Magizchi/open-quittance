import db from '$lib/server/database.js';
import { sessionsTables } from '$lib/server/schema';
import { eq } from 'drizzle-orm';


export async function GET({ params }) {
    try {
        console.log('organisation', params.id);

        const orga = db.select().from(sessionsTables).where(eq(
            sessionsTables.user_id, +params.id
        ));

        console.log('org', orga);


    } catch (err) {
        return new Response(null, { status: 404 });
    }
}