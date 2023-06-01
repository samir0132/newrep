/*
  Warnings:

  - You are about to drop the column `password` on the `driver` table. All the data in the column will be lost.
  - Added the required column `hashedpassword` to the `driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driver" DROP COLUMN "password",
ADD COLUMN     "hashedpassword" VARCHAR(30) NOT NULL;
