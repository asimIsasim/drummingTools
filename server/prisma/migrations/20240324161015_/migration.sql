/*
  Warnings:

  - You are about to drop the `blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `video` to the `lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RoutineID` to the `practice_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lesson` ADD COLUMN `video` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `practice_routines` ADD COLUMN `user` INTEGER NULL;

-- AlterTable
ALTER TABLE `practice_sessions` ADD COLUMN `RoutineID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `blog`;

-- DropTable
DROP TABLE `video`;

-- CreateIndex
CREATE INDEX `user` ON `practice_routines`(`user`);

-- CreateIndex
CREATE INDEX `routine key` ON `practice_sessions`(`RoutineID`);

-- AddForeignKey
ALTER TABLE `practice_routines` ADD CONSTRAINT `practice_routines_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `practice_sessions` ADD CONSTRAINT `routine key` FOREIGN KEY (`RoutineID`) REFERENCES `practice_routines`(`practice_routine_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
