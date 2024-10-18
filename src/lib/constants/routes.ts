export const ROUTES = {
	login: '/login',
	landing: '/',
	createLandlords: '/landlords/new',
	properties: '/properties',
	createProperty: '/properties/new',
	property: '/properties/{id}',
	tenants: '/tenants',
	createTenant: '/tenants/new',
	rentals: '/rentals',
	createRental: '/rentals/new',
	settings: '/settings',
	logout: '/logout'
} as const;
