/*
  Warnings:

  - The `pickup1` column on the `tripshared` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finalpoint1` column on the `tripshared` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pickup2` column on the `tripshared` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finalpoint2` column on the `tripshared` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `triproad1` on the `tripshared` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `triproad2` on the `tripshared` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tripshared" DROP COLUMN "pickup1",
ADD COLUMN     "pickup1" DOUBLE PRECISION[],
DROP COLUMN "finalpoint1",
ADD COLUMN     "finalpoint1" DOUBLE PRECISION[],
DROP COLUMN "triproad1",
ADD COLUMN     "triproad1" JSONB NOT NULL,
DROP COLUMN "pickup2",
ADD COLUMN     "pickup2" DOUBLE PRECISION[],
DROP COLUMN "finalpoint2",
ADD COLUMN     "finalpoint2" DOUBLE PRECISION[],
DROP COLUMN "triproad2",
ADD COLUMN     "triproad2" JSONB NOT NULL;
