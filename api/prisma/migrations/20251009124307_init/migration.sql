-- CreateTable
CREATE TABLE "GuestRegistration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "macAddress" VARCHAR(64),
    "ipAddress" VARCHAR(64),
    "loginMethod" VARCHAR(32),

    CONSTRAINT "GuestRegistration_pkey" PRIMARY KEY ("id")
);
