/*
  Warnings:

  - The `memo` column on the `Note` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "memo",
ADD COLUMN     "memo" TEXT[];
