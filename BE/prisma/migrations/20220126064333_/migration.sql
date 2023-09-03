/*
  Warnings:

  - Added the required column `vote` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `votes` ADD COLUMN `vote` BOOLEAN NOT NULL;
