-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_orderId_fkey`;

-- AlterTable
ALTER TABLE `Order` ALTER COLUMN `sended` DROP DEFAULT;
