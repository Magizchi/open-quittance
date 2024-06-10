
export default interface RentalModel {
    tenant: {
        id: number,
        name: string,
    },
    landlord: {
        id: number,
        name: string,
    },
    property: {
        id: number,
        name: string,
        city: string,
    },
    rentalId: number,
    startDate: string | Date,
    endDate: string | Date;
}