import { mysqlTable, bigint, varchar, date, int } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    firstName: varchar('firstName', { length: 255 }).notNull(),
    lastName: varchar('lastName', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    loginToken: varchar('loginToken', { length: 255 }),
});

export const landlordsTable = mysqlTable('landlords', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    siret: varchar('siret', { length: 255 }),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    postalCode: varchar('postalCode', { length: 5 }).notNull(),
});

export const tenantsTable = mysqlTable('tenants', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    siret: varchar('siret', { length: 255 }),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    postalCode: varchar('postalCode', { length: 5 }).notNull(),
});


export const propertiesTable = mysqlTable('properties', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    landlord_id: bigint('landlord_id', { mode: 'number' }).notNull().references(() => landlordsTable.id),
    name: varchar('name', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    postalCode: varchar('postalCode', { length: 5 }).notNull(),
    rent: int('rent').notNull(),
    condo_fees: int('condo_fees').notNull(),
    taxes: int('taxes').notNull(),
});

export const rentalsTable = mysqlTable('rentals', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    startedAt: date('startedAt').notNull(),
    endDate: date('endDate'),
    tenant_id: bigint('tenant_id', { mode: 'number' }).notNull().references(() => tenantsTable.id),
    property_id: bigint('property_id', { mode: 'number' }).notNull().references(() => propertiesTable.id),
});

export const receiptsTable = mysqlTable('receipts', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    rental_id: bigint('rental_id', { mode: 'number' }).references(() => rentalsTable.id),
    number: varchar('number', { length: 255 }).notNull(),

    landlord_id: bigint('landlord_id', { mode: 'number' }).notNull().references(() => landlordsTable.id),
    landlord_fullName: varchar('landlord_fullName', { length: 255 }).notNull(),
    landlord_address: varchar('landlord_address', { length: 255 }).notNull(),
    landlord_city: varchar('landlord_city', { length: 255 }).notNull(),
    landlord_postalCode: varchar('landlord_postalCode', { length: 255 }).notNull(),

    tenant_id: bigint('tenant_id', { mode: 'number' }).notNull().references(() => tenantsTable.id),
    tenant_fullName: varchar('tenant_fullName', { length: 255 }).notNull(),
    tenant_address: varchar('tenant_address', { length: 255 }).notNull(),
    tenant_city: varchar('tenant_city', { length: 255 }).notNull(),
    tenant_postalCode: varchar('tenant_postalCode', { length: 255 }).notNull(),

    rent: int('rent').notNull(),
    condo_fees: int('condo_fees').notNull(),
    taxes: int('taxes').notNull(),

    property_address: varchar('property_address', { length: 255 }).notNull(),
    property_city: varchar('property_city', { length: 255 }).notNull(),
    property_postalCode: varchar('property_postalCode', { length: 255 }).notNull(),

    paymentDate: date('paymentDate'),
    startDate: date('startDate').notNull(),
    endDate: date('endDate').notNull(),
    createAt: date('createAt'),

});
