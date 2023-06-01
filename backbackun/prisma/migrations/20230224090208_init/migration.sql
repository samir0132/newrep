-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwor" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);
