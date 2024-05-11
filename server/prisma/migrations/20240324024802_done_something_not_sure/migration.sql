/*
  Warnings:

  - You are about to drop the column `blog_id` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `video_id` on the `lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lesson` DROP COLUMN `blog_id`,
    DROP COLUMN `video_id`;

-- CreateTable
CREATE TABLE `Practice_Sessions` (
    `practice_sessions_id` INTEGER NOT NULL AUTO_INCREMENT,
    `filepath` VARCHAR(191) NOT NULL,
    `bpm` INTEGER NOT NULL,

    PRIMARY KEY (`practice_sessions_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
