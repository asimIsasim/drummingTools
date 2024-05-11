/*
  Warnings:

  - Added the required column `description` to the `practice_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `practice_sessions` ADD COLUMN `description` VARCHAR(191) NOT NULL;
