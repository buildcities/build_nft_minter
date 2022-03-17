/*
  Warnings:

  - You are about to drop the column `metaDataProxy` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "metaDataProxy",
ADD COLUMN     "proxyLink" TEXT;
