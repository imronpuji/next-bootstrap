-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `post_tagged` DROP FOREIGN KEY `Post_tagged_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_post_id_fkey`;

-- AlterTable
ALTER TABLE `comments` MODIFY `post_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `post_tagged` MODIFY `post_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `votes` MODIFY `post_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Post_tagged` ADD CONSTRAINT `Post_tagged_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
