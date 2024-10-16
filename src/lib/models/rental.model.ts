
import type { landlordsTable, propertiesTable, rentalsTable, tenantsTable } from "$lib/db/schema";

type rentalType = typeof rentalsTable.$inferSelect;
type tenantsType = typeof tenantsTable.$inferSelect;
type propertiesType = typeof propertiesTable.$inferSelect;
type landlordsType = typeof landlordsTable.$inferSelect;

export default interface RentalModel {
	rentals: rentalType;
	tenants: tenantsType;
	landlords: landlordsType;
	properties: propertiesType;
}
