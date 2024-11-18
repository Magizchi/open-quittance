CREATE TABLE `landlords` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`siret` varchar(255),
	`address` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`postalCode` varchar(5) NOT NULL,
	CONSTRAINT `landlords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`landlord_id` bigint NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`postalCode` varchar(5) NOT NULL,
	`rent` int NOT NULL,
	`condo_fees` int NOT NULL,
	`taxes` int NOT NULL,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `receipts` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`rental_id` bigint,
	`number` varchar(255) NOT NULL,
	`landlord_id` bigint NOT NULL,
	`landlord_fullName` varchar(255) NOT NULL,
	`landlord_address` varchar(255) NOT NULL,
	`landlord_city` varchar(255) NOT NULL,
	`landlord_postalCode` varchar(255) NOT NULL,
	`tenant_id` bigint NOT NULL,
	`tenant_fullName` varchar(255) NOT NULL,
	`tenant_address` varchar(255) NOT NULL,
	`tenant_city` varchar(255) NOT NULL,
	`tenant_postalCode` varchar(255) NOT NULL,
	`rent` int NOT NULL,
	`condo_fees` int NOT NULL,
	`taxes` int NOT NULL,
	`property_address` varchar(255) NOT NULL,
	`property_city` varchar(255) NOT NULL,
	`property_postalCode` varchar(255) NOT NULL,
	`paymentDate` date,
	`startDate` date NOT NULL,
	`endDate` date NOT NULL,
	`createAt` date,
	CONSTRAINT `receipts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rentals` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`startedAt` date NOT NULL,
	`endDate` date,
	`tenant_id` bigint NOT NULL,
	`property_id` bigint NOT NULL,
	CONSTRAINT `rentals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`siret` varchar(255),
	`address` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`postalCode` varchar(5) NOT NULL,
	CONSTRAINT `tenants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`loginToken` varchar(255),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `properties` ADD CONSTRAINT `properties_landlord_id_landlords_id_fk` FOREIGN KEY (`landlord_id`) REFERENCES `landlords`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_rental_id_rentals_id_fk` FOREIGN KEY (`rental_id`) REFERENCES `rentals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_landlord_id_landlords_id_fk` FOREIGN KEY (`landlord_id`) REFERENCES `landlords`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_tenant_id_tenants_id_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_tenant_id_tenants_id_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_property_id_properties_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE no action ON UPDATE no action;