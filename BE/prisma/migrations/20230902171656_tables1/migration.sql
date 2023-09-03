/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_tagged` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supporting_document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_post_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post_category` DROP FOREIGN KEY `Post_category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post_category` DROP FOREIGN KEY `Post_category_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post_tagged` DROP FOREIGN KEY `Post_tagged_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post_tagged` DROP FOREIGN KEY `Post_tagged_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Supporting_document` DROP FOREIGN KEY `Supporting_document_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Votes` DROP FOREIGN KEY `Votes_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Votes` DROP FOREIGN KEY `Votes_user_id_fkey`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Comments`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Post_category`;

-- DropTable
DROP TABLE `Post_tagged`;

-- DropTable
DROP TABLE `Post_types`;

-- DropTable
DROP TABLE `Setting`;

-- DropTable
DROP TABLE `Supporting_document`;

-- DropTable
DROP TABLE `Votes`;
