CREATE TABLE `pages_history` (
	`id` varchar(10) NOT NULL,
	`blocks` json NOT NULL,
	`timestamp` timestamp NOT NULL,
	`action` enum('automatic','save','publish','addBlock','deleteBlock','moveBlock','undo') NOT NULL,
	`pageId` varchar(36) NOT NULL,
	CONSTRAINT `pages_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `pages_history` ADD CONSTRAINT `pages_history_pageId_pages_id_fk` FOREIGN KEY (`pageId`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;