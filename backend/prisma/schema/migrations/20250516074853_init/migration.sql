/*
  Warnings:

  - You are about to drop the column `codeSnippets` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `referenceSolutions` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `testcases` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `codeSnippet` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceSolution` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "codeSnippets",
DROP COLUMN "referenceSolutions",
DROP COLUMN "testcases",
ADD COLUMN     "codeSnippet" JSONB NOT NULL,
ADD COLUMN     "referenceSolution" JSONB NOT NULL,
ADD COLUMN     "testCases" JSONB NOT NULL;
