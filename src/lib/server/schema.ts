import { mysqlTable, bigint, varchar, date } from 'drizzle-orm/mysql-core';

export const ownersTable = mysqlTable('owners', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }),
    address: varchar('address', { length: 255 }),
    city: varchar('city', { length: 255 }),
    postalCode: varchar('postalCode', { length: 5 }),
    email: varchar('email', { length: 255 }),
    password: varchar('password', { length: 255 }),

})

export const tenantsTable = mysqlTable('tenants', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }),
    address: varchar('address', { length: 255 }),
    city: varchar('city', { length: 255 }),
    postalCode: varchar('postalCode', { length: 5 }),
    email: varchar('email', { length: 255 }),
    password: varchar('password', { length: 255 })
})

export const localsTable = mysqlTable('locals', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }),
    address: varchar('address', { length: 255 }),
    city: varchar('city', { length: 255 }),
    postalCode: varchar('postalCode', { length: 5 }),
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

// export const ownersTableRelations = relations(ownersTable, ({ many }) => ({ locals: many(localsTable) }))

// export const localsTableRelations = relations(localsTable, ({ one }) => ({ owners: one(ownersTable, { fields: [localsTable.ownerId], references: [ownersTable.id] }) }))4