/*
  Warnings:

  - You are about to alter the column `first_name` on the `user_profiles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `VarChar(20)`.
  - You are about to alter the column `last_name` on the `user_profiles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `VarChar(20)`.
  - You are about to alter the column `username` on the `user_profiles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "user_profiles" ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "onboarding_step" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "refresh_token" SET DATA TYPE VARCHAR;
