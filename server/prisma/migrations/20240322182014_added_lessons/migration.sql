-- CreateTable
CREATE TABLE `Lesson` (
    `lesson_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `course_id` INTEGER NOT NULL,
    `video_id` INTEGER NULL,
    `blog_id` INTEGER NULL,

    PRIMARY KEY (`lesson_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Courses`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
