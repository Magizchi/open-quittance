import db from '$lib/db/drizzle';
import { receiptsTable } from '$lib/db/schema';
import { addPaymentDate } from '$lib/utils/service/receipts';
import { desc } from 'drizzle-orm';


export async function load({ parent }) {
	await parent();

	const receiptList = await db
		.select()
		.from(receiptsTable)
		.orderBy(desc(receiptsTable.startDate));

	return { receiptList };
}

export const actions = {
	paymentDate: async ({ request }) => {
		return await addPaymentDate(request);
	}
};
