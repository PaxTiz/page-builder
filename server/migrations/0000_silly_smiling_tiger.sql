CREATE TABLE `pages` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`blocks` json NOT NULL,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`firstname` varchar(191) NOT NULL,
	`lastname` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password` varchar(60) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
