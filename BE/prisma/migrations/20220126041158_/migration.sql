/*
  Warnings:

  - You are about to drop the column `post_type_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `post_type_id`,
    DROP COLUMN `user_id`;
