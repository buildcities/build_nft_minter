-- CreateTable
CREATE TABLE "Version" (
    "id" SERIAL NOT NULL,
    "assetId" INTEGER NOT NULL,
    "updateAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadataLink" TEXT,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);
