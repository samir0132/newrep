/*
  Warnings:

  - Changed the type of `totalworkingtime` on the `driveraccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "driveraccount" DROP COLUMN "totalworkingtime",
ADD COLUMN     "totalworkingtime" DOUBLE PRECISION NOT NULL;
