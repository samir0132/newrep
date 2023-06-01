-- CreateTable
CREATE TABLE "tripshared" (
    "id" INTEGER NOT NULL,
    "driverid" INTEGER NOT NULL,
    "clientid1" INTEGER NOT NULL,
    "clientid2" INTEGER NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "pickup1" TEXT[],
    "finalpoint1" TEXT[],
    "triproad1" TEXT[],
    "pickup2" TEXT[],
    "finalpoint2" TEXT[],
    "triproad2" TEXT[],
    "startat" TIMESTAMP(3) NOT NULL,
    "secondat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tripshared_pkey" PRIMARY KEY ("id")
);
