/*
  Warnings:

  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_email_key";

-- DropIndex
DROP INDEX "Client_username_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email",
DROP COLUMN "lastname",
DROP COLUMN "name",
DROP COLUMN "username";
