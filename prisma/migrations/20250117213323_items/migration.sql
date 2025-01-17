/*
  Warnings:

  - A unique constraint covering the columns `[lot]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `category` VARCHAR(191) NULL DEFAULT 'Uncategorized',
    ADD COLUMN `cost` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL DEFAULT '€',
    ADD COLUMN `lot` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `tags` VARCHAR(191) NULL DEFAULT 'Uncategorized',
    MODIFY `price` DOUBLE NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `sended` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Item_lot_key` ON `Item`(`lot`);
