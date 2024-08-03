import db from '$lib/server/database';
import { receiptsTable } from '$lib/server/schema';
import { addPaymentDate } from '$lib/utils/service/receipts';
import dayjs from 'dayjs';
import { desc } from 'drizzle-orm';

export async function load({ parent }) {
    await parent();

    let lastMonth: unknown = null;

    const receiptList: (string | {
        number: string; id: number; rental_id: number | null; tenant_id: number; landlord_id: number; rent: number; condo_fees: number; taxes: number; landlord_fullName: string; landlord_address: string; landlord_city: string; landlord_postalCode: string; tenant_fullName: string; tenant_address: string; tenant_city: string; tenant_postalCode: string; property_address: string; property_city: string; property_postalCode: string // Check if receipt exist for this month
        ; paymentDate: Date | null; startDate: Date; endDate: Date; createAt: Date | null;
    })[] = [];

    let lastestYear: number | null = null;

    (await db.select().from(receiptsTable).orderBy(desc(receiptsTable.startDate)))
        .forEach((item) => {
            if (lastMonth !== dayjs(item.startDate).get('month') || lastestYear !== dayjs(item.startDate).get('year')) {
                lastMonth = dayjs(item.startDate).get('month');
                lastestYear = dayjs(item.startDate).get('year');

                receiptList.push(`${dayjs(item.startDate).format('MMMM')} ${dayjs(item.startDate).format('YYYY')}`);
                receiptList.push(item);
            } else {
                receiptList.push(item);
            }
        });

    return { receiptList };
}

export const actions = {
    paymentDate: async ({ request }) => {
        return await addPaymentDate(request);
    }
};