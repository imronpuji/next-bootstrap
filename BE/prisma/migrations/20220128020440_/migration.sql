-- CreateTable
CREATE TABLE `Supporting_document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo_id_card` TEXT NOT NULL,
    `self_id_card` TEXT NOT NULL,
    `organization_card` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Supporting_document` ADD CONSTRAINT `Supporting_document_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
