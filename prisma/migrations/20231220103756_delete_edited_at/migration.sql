/*
  Warnings:

  - You are about to drop the column `edited_at` on the `Impression` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Impression" (
    "impression_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subscription_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "posted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Impression_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Impression" ("comment", "impression_id", "posted_at", "rating", "subscription_id") SELECT "comment", "impression_id", "posted_at", "rating", "subscription_id" FROM "Impression";
DROP TABLE "Impression";
ALTER TABLE "new_Impression" RENAME TO "Impression";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
