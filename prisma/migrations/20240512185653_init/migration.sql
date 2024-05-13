-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEWIMAGE', 'NEWCOMPANY');

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyDetails" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "numberOfUsers" INTEGER NOT NULL,
    "numberOfProducts" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "notificationType" "NotificationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_id_key" ON "Accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDetails_id_key" ON "CompanyDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDetails_companyName_key" ON "CompanyDetails"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Images_id_key" ON "Images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_id_key" ON "Notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_activityId_key" ON "Notifications"("activityId");
