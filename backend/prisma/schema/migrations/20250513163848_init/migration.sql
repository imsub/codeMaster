-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "avatar" DROP NOT NULL;
