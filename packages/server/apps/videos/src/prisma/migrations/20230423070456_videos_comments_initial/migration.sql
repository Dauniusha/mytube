-- CreateTable
CREATE TABLE "channels" (
    "channel_id" UUID NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("channel_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" UUID NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "path" VARCHAR(2000) NOT NULL,
    "channel_id" UUID NOT NULL,
    "description" VARCHAR(300),
    "preview" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "video_id" UUID NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "videos_name_key" ON "videos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "videos_path_key" ON "videos"("path");

-- CreateIndex
CREATE INDEX "videos_name_idx" ON "videos"("name");

-- CreateIndex
CREATE INDEX "comments_created_at_idx" ON "comments"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("channel_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
