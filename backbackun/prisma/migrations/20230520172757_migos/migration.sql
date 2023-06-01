/*
  Warnings:

  - You are about to drop the `driveraccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "driveraccount";

-- CreateTable
CREATE TABLE "driver" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "candrive" BOOLEAN NOT NULL,
    "licenceV" BOOLEAN NOT NULL,
    "accountstatut" BOOLEAN NOT NULL,
    "totalworkingtime" DOUBLE PRECISION NOT NULL,
    "birthdata" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "carmodel" TEXT NOT NULL,
    "nameonvrd" TEXT NOT NULL,
    "carconstractor" TEXT NOT NULL,
    "typeofcar" TEXT NOT NULL,
    "accountcreationdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);
