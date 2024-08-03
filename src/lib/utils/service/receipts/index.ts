import FormDataToJson from '$lib/utils/FormDataToJson';
import db from '$lib/server/database.js';
import { landlordsTable, propertiesTable, receiptsTable, rentalsTable, tenantsTable } from '$lib/server/schema';
import dayjs from 'dayjs';
import { and, eq, isNull, notInArray, sql } from 'drizzle-orm';
import { RentalModel } from '$lib/models';

/**
 * Add payment date to receipt
 * @param request 
 * @returns 
 */
export const addPaymentDate = async (request: Request) => {
    const data = await request.formData();
    const info = FormDataToJson(data);
    try {
        await db.update(receiptsTable).set({ createAt: dayjs(info.paymentDate).toDate(), paymentDate: dayjs(info.paymentDate).toDate() })
            .where(eq(receiptsTable.id, +info.receiptID));
    } catch (err) {
        return {
            success: false,
            status: 400,
            message: err
        };
    }
};

/**
 * Créer tous les quittances de loyer pour tout les locations en cours pour le mois
 */
export const GenerateNewReceipts = async () => {
    // create receipt every time, need to be a CRON
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
    const rentals =
        await db.select().from(rentalsTable)
            .rightJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
            .rightJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
            .rightJoin(landlordsTable, eq(landlordsTable.id, propertiesTable.landlord_id))
            .where(and(notInArray(rentalsTable.id, receiptOfThisMonth.map(item => item!.rental_id)), isNull(rentalsTable.endDate))) as unknown as RentalModel[];

    // Create receipts for this month
    rentals.forEach(rental => {
        if (dayjs(rental.rentals.startedAt) < dayjs()) {
            CreateReceipts(rental, firstDateOfThisMonth, lastDateOfThisMonth);
        }
    });
};

/**
 * CreateReceipt one receipt
 * @param rental All info Tenant, Landlord, Property for create the receipt 
 * @param startDate when then rental period start
 * @param endDate when then rental period end
 */
export const CreateReceipts = async (rental: RentalModel, startDate: string, endDate: string) => {
    const newReceipts = {
        rental_id: rental.rentals.id,
        number: '',
        landlord_id: rental.landlords.id,
        landlord_fullName: rental.landlords.name,
        landlord_address: rental.landlords.address,
        landlord_city: rental.landlords.city,
        landlord_postalCode: rental.landlords.postalCode,

        tenant_id: rental.tenants.id,
        tenant_address: rental.tenants.address,
        tenant_city: rental.tenants.city,
        tenant_fullName: rental.tenants.name,
        tenant_postalCode: rental.tenants.postalCode,

        rent: rental.properties.rent,
        condo_fees: rental.properties.condo_fees,
        taxes: rental.properties.taxes,

        property_address: rental.properties.address,
        property_city: rental.properties.city,
        property_postalCode: rental.properties.postalCode,

        paymentDate: null,
        startDate: dayjs(startDate).toDate(),
        endDate: dayjs(endDate).toDate(),
        createAt: dayjs(dayjs().format('YYYY/MM/DD')).toDate()
    };
    console.log('newReceipts', newReceipts);
    return await db.insert(receiptsTable).values(newReceipts);
};
