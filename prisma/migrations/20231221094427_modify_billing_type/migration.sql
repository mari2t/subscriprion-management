/*
  Warnings:

  - You are about to drop the column `frequency` on the `Subscription` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "billingType" TEXT NOT NULL DEFAULT 'DAILY',
    "billingInterval" INTEGER NOT NULL DEFAULT 0,
    "url" TEXT NOT NULL,
    "contracted_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Subscription" ("contracted_at", "fee", "id", "image", "name", "overview", "updated_at", "url") SELECT "contracted_at", "fee", "id", "image", "name", "overview", "updated_at", "url" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
