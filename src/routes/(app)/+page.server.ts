import ReceiptsModel from '$lib/models/receipts.model.js';
import db from '$lib/server/database.js';
import { receiptsTable } from '$lib/server/schema.js';
import { GenerateNewReceipts, addPaymentDate } from '$lib/utils/service/receipts';
import { sql } from 'drizzle-orm';

export const load = async ({ parent }) => {
    await parent();

    await GenerateNewReceipts();

    const receiptList: ReceiptsModel[] = await db.select().from(receiptsTable)
        .where(sql`MONTH(${receiptsTable.startDate}) >= MONTH(now()) AND YEAR(${receiptsTable.startDate}) >= YEAR(now())`);

    return { receiptList };
};

export const actions = {
    paymentDate: async ({ request }) => {
        return await addPaymentDate(request);
    }
};