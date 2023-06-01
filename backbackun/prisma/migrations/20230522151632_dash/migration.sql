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
    "rate" DOUBLE PRECISION NOT NULL,
    "numbrate" INTEGER NOT NULL,
    "carconstractor" TEXT NOT NULL,
    "typeofcar" TEXT NOT NULL,
    "accountcreationdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);
