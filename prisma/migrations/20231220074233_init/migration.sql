-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "contracted_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Impression" (
    "impression_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subscriptionId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "posted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" DATETIME NOT NULL,
    CONSTRAINT "Impression_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");
