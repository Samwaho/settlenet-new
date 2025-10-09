/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `GuestRegistration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GuestRegistration_phoneNumber_key" ON "GuestRegistration"("phoneNumber");
