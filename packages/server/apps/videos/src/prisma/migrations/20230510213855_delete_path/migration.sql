/*
  Warnings:

  - You are about to drop the column `path` on the `videos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "videos_path_key";

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "path";
