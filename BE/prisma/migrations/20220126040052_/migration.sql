-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_post_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_user_id_fkey`;

-- CreateTable
CREATE TABLE `_PostToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToUser_AB_unique`(`A`, `B`),
    INDEX `_PostToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PostToPost_types` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToPost_types_AB_unique`(`A`, `B`),
    INDEX `_PostToPost_types_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostToUser` ADD FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToPost_types` ADD FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToPost_types` ADD FOREIGN KEY (`B`) REFERENCES `Post_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
