/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "client";

-- DropTable
DROP TABLE "driver";

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "hashedpassword" VARCHAR(30) NOT NULL,
    "phonenb" VARCHAR(12) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "photo" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "candrive" BOOLEAN NOT NULL,
    "licenceV" BOOLEAN NOT NULL,
    "anssurance" BOOLEAN NOT NULL,
    "accountstatut" BOOLEAN NOT NULL,
    "totalworkingtime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255) NOT NULL,
    "phonenb" VARCHAR(12) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip" (
    "id" SERIAL NOT NULL,
    "driverid" INTEGER NOT NULL,
    "clientid" INTEGER NOT NULL,
    "pickup" TEXT[],
    "finalpoint" TEXT[],
    "triproad" TEXT[],
    "startat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phonenb_key" ON "Client"("phonenb");

-- CreateIndex
CREATE UNIQUE INDEX "Client_username_key" ON "Client"("username");

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_driverid_fkey" FOREIGN KEY ("driverid") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
