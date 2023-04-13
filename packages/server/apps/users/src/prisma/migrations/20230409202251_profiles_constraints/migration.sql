/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user_profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_profiles" ALTER COLUMN "avatar" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_username_key" ON "user_profiles"("username");
