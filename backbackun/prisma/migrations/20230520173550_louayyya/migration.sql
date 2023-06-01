/*
  Warnings:

  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "trip" DROP CONSTRAINT "trip_driverid_fkey";

-- DropTable
DROP TABLE "Driver";
