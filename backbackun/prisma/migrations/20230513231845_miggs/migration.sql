/*
  Warnings:

  - You are about to drop the column `clientid` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "trip" DROP CONSTRAINT "trip_clientid_fkey";

-- AlterTable
ALTER TABLE "trip" DROP COLUMN "clientid";

-- DropTable
DROP TABLE "Client";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" TEXT NOT NULL,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
