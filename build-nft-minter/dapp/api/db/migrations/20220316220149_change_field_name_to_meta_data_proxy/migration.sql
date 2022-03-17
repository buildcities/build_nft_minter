/*
  Warnings:

  - You are about to drop the column `assetproxy` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "assetproxy",
ADD COLUMN     "metaDataProxy" TEXT;
