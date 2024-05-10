import { json } from '@sveltejs/kit';
import { landlordsTable, propertiesTable, rentalsTable, tenantsTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import db from '$lib/server/database';
import dayjs from 'dayjs';
import { CreateReceipts } from '$lib/utils/service/createReceipts.js';

export async function POST({ request }) {
    const requests = await request.json();

    const [rentalList] =
        await db.select().from(rentalsTable).where(eq(rentalsTable.id, requests.rental_id))
            .rightJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
            .rightJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
            .rightJoin(landlordsTable, eq(landlordsTable.id, propertiesTable.landlord_id));

    const firstDateOfMonth = dayjs().month(requests.month_id).startOf('month').format('YYYY/MM/DD');
    const endDateOfMonth = dayjs().month(requests.month_id).endOf('month').format('YYYY/MM/DD');

    const res = CreateReceipts(rentalList, firstDateOfMonth, endDateOfMonth);

    return json({ res }, { status: 201 });
};
