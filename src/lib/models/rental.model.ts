// import type {rentalsTable} from '$lib/server/schema';

// type rentalType = typeof rentalsTable.$inferSelect;

export default interface RentalModel {
    rentals: {
        id: number;
        startedAt: Date;
        endDate: Date | null;
        tenant_id: number;
        property_id: number;
    };
    tenants: {
        id: number;
        name: string;
        siret: string | null;
        address: string;
        city: string;
        postalCode: string;
    };
    landlords: {
        id: number;
        name: string;
        siret: string | null;
        address: string;
        city: string;
        postalCode: string;
    },
    properties: {
        id: number,
        name: string,
        address: string;
        city: string;
        postalCode: string;
        rent: number;
        condo_fees: number;
        taxes: number;
    },
    rentalId: number,
    startAt: string | Date,
    endDate: string | Date;
}