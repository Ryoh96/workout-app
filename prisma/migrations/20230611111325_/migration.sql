/*
  Warnings:

  - You are about to drop the column `memo` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "memo",
ADD COLUMN     "memos" TEXT[];
