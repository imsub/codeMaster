/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "avatar" JSONB NOT NULL,
ADD COLUMN     "emailVerificationExpiry" TIMESTAMP(3),
ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "forgotPasswordExpiry" TIMESTAMP(3),
ADD COLUMN     "forgotPasswordToken" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "temporaryPassword" TEXT,
ADD COLUMN     "temporaryPasswordExpiry" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "TokenBlacklist" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenBlacklist_token_key" ON "TokenBlacklist"("token");
