/*
  Warnings:

  - You are about to drop the `tripshared` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tripshared";

-- CreateTable
CREATE TABLE "ride" (
    "id" SERIAL NOT NULL,
    "driverid" INTEGER NOT NULL,
    "clientid1" INTEGER NOT NULL,
    "clientid2" INTEGER NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "startat" TIMESTAMP(3) NOT NULL,
    "secondat" TIMESTAMP(3) NOT NULL,
    "totalprice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ride_pkey" PRIMARY KEY ("id")
);
