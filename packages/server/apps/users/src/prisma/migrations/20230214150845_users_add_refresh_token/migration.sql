/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_username_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "username",
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "last_sign_in" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "user_profiles" (
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(60) NOT NULL,
    "last_name" VARCHAR(60) NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "avatar" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE INDEX "user_profiles_username_idx" ON "user_profiles"("username");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
