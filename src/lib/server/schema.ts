import { mysqlTable, bigint, varchar, date, int } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    firstName: varchar('firstName', { length: 255 }),
    lastName: varchar('firstName', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    loginToken: varchar('loginToken', { length: 255 }),
})

export const companiesTable = mysqlTable('companies', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    userId: bigint('user_id', { mode: 'number' }).references(() => usersTable.id),
    companyName: varchar('name', { length: 255 }).notNull(),
    siretNumber: int('siretNumber'),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    postalCode: varchar('postalCode', { length: 5 }).notNull(),
})

// export const ownersTable = mysqlTable('owners', {
//     id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
//     userId: bigint('user_id', { mode: 'number' }).references(() => usersTable.id),
//     companieName: varchar('name', { length: 255 }),
//     address: varchar('address', { length: 255 }),
//     city: varchar('city', { length: 255 }),
//     postalCode: varchar('postalCode', { length: 5 }),
// })

// export const tenantsTable = mysqlTable('tenants', {
//     id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
//     userId: bigint('user_id', { mode: 'number' }).references(() => usersTable.id),
//     companieName: varchar('name', { length: 255 }),
//     address: varchar('address', { length: 255 }),
//     city: varchar('city', { length: 255 }),
//     postalCode: varchar('postalCode', { length: 5 }),
// })

export const localsTable = mysqlTable('locals', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }),
    address: varchar('address', { length: 255 }),
    city: varchar('city', { length: 255 }),
    postalCode: varchar('postalCode', { length: 5 }),
    ownerId: bigint('owner_id', { mode: 'number' }).references(() => companiesTable.id),
    tenantId: bigint('tenant_id', { mode: 'number' }).references(() => companiesTable.id)
})


export const receiptsTable = mysqlTable('receipts', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    paymentDate: date('paymentDate'),
    createAt: date('createAt'),
    period: varchar('period', { length: 255 }),
    ownerId: bigint('owner_id', { mode: 'number' }).references(() => companiesTable.id),
    tenantId: bigint('tenant_id', { mode: 'number' }).references(() => companiesTable.id)
})