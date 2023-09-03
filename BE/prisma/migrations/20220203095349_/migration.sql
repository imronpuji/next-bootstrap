/*
  Warnings:

  - You are about to drop the column `post_typesId` on the `post` table. All the data in the column will be lost.
  - Added the required column `post_type_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_post_typesId_fkey`;

-- DropIndex
DROP INDEX `Post_id_key` ON `post`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `post_typesId`,
    ADD COLUMN `post_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_post_type_id_fkey` FOREIGN KEY (`post_type_id`) REFERENCES `Post_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
