/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `channels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "alias" VARCHAR(12) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "channels_alias_key" ON "channels"("alias");

-- CreateIndex
CREATE INDEX "channels_alias_idx" ON "channels"("alias");

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
