/*
  Warnings:

  - You are about to drop the `_posttouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_posttouser` DROP FOREIGN KEY `_posttouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_posttouser` DROP FOREIGN KEY `_posttouser_ibfk_2`;

-- DropIndex
DROP INDEX `Post_post_type_id_fkey` ON `post`;

-- DropIndex
DROP INDEX `Post_user_id_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `_posttouser`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
