/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `subscriptionId` on the `Impression` table. All the data in the column will be lost.
  - Added the required column `subscription_id` to the `Impression` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_name_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Impression" (
    "impression_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subscription_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "posted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" DATETIME NOT NULL,
    CONSTRAINT "Impression_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Impression" ("comment", "edited_at", "impression_id", "posted_at", "rating") SELECT "comment", "edited_at", "impression_id", "posted_at", "rating" FROM "Impression";
DROP TABLE "Impression";
ALTER TABLE "new_Impression" RENAME TO "Impression";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
