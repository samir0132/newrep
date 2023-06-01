/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
CREATE SEQUENCE tripshared_id_seq;
ALTER TABLE "tripshared" ALTER COLUMN "id" SET DEFAULT nextval('tripshared_id_seq');
ALTER SEQUENCE tripshared_id_seq OWNED BY "tripshared"."id";

-- DropTable
DROP TABLE "account";

-- CreateTable
CREATE TABLE "driveraccount" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "candrive" BOOLEAN NOT NULL,
    "licenceV" BOOLEAN NOT NULL,
    "accountstatut" BOOLEAN NOT NULL,
    "totalworkingtime" TIMESTAMP(3) NOT NULL,
    "accountcreationdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,

    CONSTRAINT "driveraccount_pkey" PRIMARY KEY ("id")
);
