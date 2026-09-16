-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'med', 'hard');

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" "Difficulty",
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_levels" (
    "id" UUID NOT NULL,
    "game_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "level_order" INTEGER NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "game_levels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "games_slug_key" ON "games"("slug");

-- AddForeignKey
ALTER TABLE "games"
ADD CONSTRAINT "games_category_id_fkey"
FOREIGN KEY ("category_id")
REFERENCES "categories"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_levels"
ADD CONSTRAINT "game_levels_game_id_fkey"
FOREIGN KEY ("game_id")
REFERENCES "games"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;