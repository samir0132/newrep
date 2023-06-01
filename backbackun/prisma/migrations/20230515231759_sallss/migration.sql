/*
  Warnings:

  - You are about to drop the column `finalpoint1` on the `tripshared` table. All the data in the column will be lost.
  - You are about to drop the column `finalpoint2` on the `tripshared` table. All the data in the column will be lost.
  - You are about to drop the column `pickup1` on the `tripshared` table. All the data in the column will be lost.
  - You are about to drop the column `pickup2` on the `tripshared` table. All the data in the column will be lost.
  - You are about to drop the column `triproad1` on the `tripshared` table. All the data in the column will be lost.
  - You are about to drop the column `triproad2` on the `tripshared` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tripshared" DROP COLUMN "finalpoint1",
DROP COLUMN "finalpoint2",
DROP COLUMN "pickup1",
DROP COLUMN "pickup2",
DROP COLUMN "triproad1",
DROP COLUMN "triproad2";
