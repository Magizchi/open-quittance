// import type { receiptsTable } from "$lib/server/schema";

// type receiptTypeII = typeof receiptsTable.$inferSelect;

interface receiptType {
    id: number;
    number: string | number,
    landlord_id: string | number;
    landlord_fullName: string;
    landlord_address: string;
    landlord_city: string;
    landlord_postalCode: string;

    tenant_id: string | number;
    tenant_address: string;
    tenant_city: string;
    tenant_fullName: string;
    tenant_postalCode: string;

    rent: string | number;
    condo_fees: string | number;
    taxes: string | number;

    property_address: string;
    property_city: string;
    property_postalCode: string;

    paymentDate: null | string | Date,
    startDate: null | string | Date;
    endDate: null | string | Date;
    createAt: null | string | Date;
}

export default interface ReceiptsModel extends receiptType { }
