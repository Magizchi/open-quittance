import type { RentalModel } from '$lib/models/rental.model';
import db from '$lib/server/database.js';
import { landlordsTable, propertiesTable, receiptsTable, rentalsTable, tenantsTable } from '$lib/server/schema.js';
import { CreateReceipts } from '$lib/utils/service/rental';
import dayjs from 'dayjs';
import { desc, eq, notInArray, sql } from 'drizzle-orm';

export const load = async ({ parent }) => {
    await parent();

    // Check if receipt exist for this month
    let receiptOfThisMonth =
        await db.selectDistinct({
            rental_id: receiptsTable.rental_id
        })
            .from(receiptsTable)
            .where(sql`MONTH(${receiptsTable.startDate}) = ${dayjs().get('month') + 1}`) as { rental_id: number; }[];

    const firstDateOfThisMonth = dayjs().startOf('month').format('YYYY/MM/DD');
    const lastDateOfThisMonth = dayjs().endOf('month').format('YYYY/MM/DD');

    // Add an element before crash
    if (receiptOfThisMonth.length === 0) {
        receiptOfThisMonth = [{ rental_id: 0 }];
    }

    // Get rentals where there no receipts for this month
    const rentals: RentalModel[] =
        await db.select().from(rentalsTable)
            .rightJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
            .rightJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
            .rightJoin(landlordsTable, eq(landlordsTable.id, propertiesTable.landlord_id))
            .where(notInArray(rentalsTable.id, receiptOfThisMonth.map(item => item!.rental_id)));


    // Create receipts for this month
    rentals.forEach(rental => {
        if (dayjs(rental.rentals?.startedAt) < dayjs()) {
            CreateReceipts(rental, firstDateOfThisMonth, lastDateOfThisMonth);
        }
    });

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
};