import db from '$lib/server/database.js';
import { receiptsTable } from '$lib/server/schema.js';
import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
    const { receiptId } = await request.json();
    if (isNaN(receiptId)) {
        return json({ message: 'Body incorrect' }, { status: 400 });
    };

    const [updated] =
        await db.update(receiptsTable)
            .set({ paymentDate: dayjs().toDate() })
            .where(eq(receiptsTable.id, +receiptId));


    if (updated.affectedRows === 0) {
        return json({ message: 'Body incorrect' }, { status: 400 });
    };

    return json({ message: 'Quittance mise à jour' }, { status: 200 });
};
