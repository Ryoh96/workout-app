/*
  Warnings:

  - You are about to drop the column `noteId` on the `Part` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Part" DROP CONSTRAINT "Part_noteId_fkey";

-- AlterTable
ALTER TABLE "Part" DROP COLUMN "noteId";
