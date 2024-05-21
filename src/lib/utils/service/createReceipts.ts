import { receiptsTable } from '$lib/server/schema.js';
import type { RentalModel } from '$lib/models/rental.model.ts';
import dayjs from 'dayjs';
import db from '$lib/server/database';

/**
 * CreateReceipt
 * @param rental All info Tenant, Landlord, Property for create the receipt 
 * @param startDate when then rental period start
 * @param endDate when then rental period end
 */
export const CreateReceipts = async (rental: RentalModel, startDate: string, endDate: string) => {
    const newReceipts = {
        rental_id: rental.rentals!.id,
        number: '',
        landlord_id: rental.landlords!.id,
        landlord_fullName: rental.landlords!.name,
        landlord_address: rental.landlords!.address,
        landlord_city: rental.landlords!.city,
        landlord_postalCode: rental.landlords!.postalCode,

        tenant_id: rental.tenants!.id,
        tenant_address: rental.tenants!.address,
        tenant_city: rental.tenants!.city,
        tenant_fullName: rental.tenants!.name,
        tenant_postalCode: rental.tenants!.postalCode,

        rent: rental.properties!.rent,
        condo_fees: rental.properties!.condo_fees,
        taxes: rental.properties!.taxes,

        property_address: rental.properties!.address,
        property_city: rental.properties!.city,
        property_postalCode: rental.properties!.postalCode,

        paymentDate: null,
        startDate: dayjs(startDate).toDate(),
        endDate: dayjs(endDate).toDate(),
        createAt: dayjs(dayjs().format('YYYY/MM/DD')).toDate()
    };
    return await db.insert(receiptsTable).values(newReceipts);
};
