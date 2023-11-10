import { mysqlTable, bigint, varchar, date, int } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    firstName: varchar('firstName', { length: 255 }),
    lastName: varchar('firstName', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    loginToken: varchar('loginToken', { length: 255 }),
})

export const ownersTable = mysqlTable('owners', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    userId: bigint('user_id', { mode: 'number' }).references(() => usersTable.id),
    companyName: varchar('companyName', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    postalCode: varchar('postalCode', { length: 5 }).notNull(),
    status: varchar('status', { length: 255 }).notNull(),
})

export const tenantsTable = mysqlTable('tenants', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    userId: bigint('user_id', { mode: 'number' }).references(() => usersTable.id),
    companyName: varchar('companyName', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    postalCode: varchar('postalCode', { length: 5 }).notNull(),
    status: varchar('status', { length: 255 }).notNull(),
})

export const localsTable = mysqlTable('locals', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    postalCode: varchar('postalCode', { length: 5 }).notNull(),
    rent: int('rent').notNull(),
    charge: int('charger').notNull(),
    tax: int('tax').notNull(),
    ownerId: bigint('owner_id', { mode: 'number' }).references(() => ownersTable.id),
    tenantId: bigint('tenant_id', { mode: 'number' }).references(() => tenantsTable.id)
})

export const receiptsTable = mysqlTable('receipts', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    paymentDate: date('paymentDate'),
    createAt: date('createAt'),
    period: varchar('period', { length: 255 }),
    ownerId: bigint('owner_id', { mode: 'number' }).references(() => ownersTable.id),
    tenantId: bigint('tenant_id', { mode: 'number' }).references(() => tenantsTable.id)
})
