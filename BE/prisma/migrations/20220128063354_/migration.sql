/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Supporting_document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Supporting_document_user_id_key` ON `Supporting_document`(`user_id`);
