-- CreateTable
CREATE TABLE "driver" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
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

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255) NOT NULL,
    "phonenb" VARCHAR(12) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "modelname" VARCHAR(255) NOT NULL,
    "nplaces" INTEGER NOT NULL,
    "inssurancenumber" VARCHAR(50) NOT NULL,
    "carlicencenumber" VARCHAR(50) NOT NULL,
    "carstatut" BOOLEAN NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_email_key" ON "driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "driver_phonenb_key" ON "driver"("phonenb");

-- CreateIndex
CREATE UNIQUE INDEX "driver_username_key" ON "driver"("username");

-- CreateIndex
CREATE UNIQUE INDEX "driver_photo_key" ON "driver"("photo");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_phonenb_key" ON "client"("phonenb");

-- CreateIndex
CREATE UNIQUE INDEX "client_username_key" ON "client"("username");

-- CreateIndex
CREATE UNIQUE INDEX "car_inssurancenumber_key" ON "car"("inssurancenumber");

-- CreateIndex
CREATE UNIQUE INDEX "car_carlicencenumber_key" ON "car"("carlicencenumber");
