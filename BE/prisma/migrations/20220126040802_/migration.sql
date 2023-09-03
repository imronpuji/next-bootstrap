/*
  Warnings:

  - You are about to drop the `_posttopost_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_typesId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_posttopost_types` DROP FOREIGN KEY `_posttopost_types_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_posttopost_types` DROP FOREIGN KEY `_posttopost_types_ibfk_2`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `post_typesId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_posttopost_types`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_post_typesId_fkey` FOREIGN KEY (`post_typesId`) REFERENCES `Post_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
