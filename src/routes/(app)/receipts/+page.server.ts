import db from '$lib/server/database';
import { receiptsTable } from '$lib/server/schema';
import { addPaymentDate } from '$lib/utils/service/receipts';
import { desc } from 'drizzle-orm';
import ReceiptsModel from '$lib/models/receipts.model.js';

export async function load({ parent }) {
    await parent();

    const receiptList: ReceiptsModel[] = await db.select().from(receiptsTable).orderBy(desc(receiptsTable.startDate));

    return { receiptList };
}

export const actions = {
    paymentDate: async ({ request }) => {
        return await addPaymentDate(request);
    }
};