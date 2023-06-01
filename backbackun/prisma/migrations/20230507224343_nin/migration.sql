/*
  Warnings:

  - Added the required column `finished` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pickup` on the `trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `finalpoint` on the `trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `triproad` on the `trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "trip" ADD COLUMN "finished" BOOLEAN NOT NULL DEFAULT false
,
DROP COLUMN "pickup",
ADD COLUMN     "pickup" JSONB NOT NULL,
DROP COLUMN "finalpoint",
ADD COLUMN     "finalpoint" JSONB NOT NULL,
DROP COLUMN "triproad",
ADD COLUMN     "triproad" JSONB NOT NULL;
