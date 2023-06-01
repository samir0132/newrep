/*
  Warnings:

  - Added the required column `password` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `driver` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "driver_email_key";

-- DropIndex
DROP INDEX "driver_phonenb_key";

-- DropIndex
DROP INDEX "driver_photo_key";

-- DropIndex
DROP INDEX "driver_username_key";

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "password" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "driver" ADD COLUMN     "password" VARCHAR(30) NOT NULL;
